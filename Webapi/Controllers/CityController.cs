using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  // This attribute sets the route prefix for all actions in this controller: api/city
  [Route("api/[controller]")]
  [ApiController]
  [Authorize] // Requires the user to be authenticated unless [AllowAnonymous] is used
  public class CityController : BaseController
  {
    private readonly IUnitOfWork uow;
    private readonly IMapper mapper;

    // Constructor injection for Unit of Work and AutoMapper
    public CityController(IUnitOfWork uow, IMapper mapper)
    {
      this.uow = uow;
      this.mapper = mapper;
    }

    // GET: api/city/cities
    // Retrieves a list of all cities. Allows anonymous access.
    [HttpGet("cities")]
    [AllowAnonymous]
    public async Task<IActionResult> GetCities()
    {
      // Fetch cities from the repository
      var cities = await uow.CityRepository.GetCitiesAsync();

      // Map City entities to CityDto objects
      var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);

      // Return 200 OK with the list of cities
      return Ok(citiesDto);
    }

    // POST: api/city/post
    // Adds a new city from the provided CityDto
    [HttpPost("post")]
    public async Task<IActionResult> AddCity(CityDto cityDto)
    {
      // Map DTO to entity
      var city = mapper.Map<City>(cityDto);
      city.LastUpdatedBy = 1; // Example user ID (in real app, use current user ID)
      city.LastUpdatedOn = DateTime.Now;

      // Add the city using the repository and save changes
      uow.CityRepository.AddCity(city);
      await uow.SaveAsync();

      // Return 201 Created
      return StatusCode(201);
    }

    // PUT: api/city/update/{id}
    // Full update of a city using its ID and a CityDto
    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
    {
      // Check if the ID in URL matches the DTO
      if (id != cityDto.Id)
        return BadRequest("Update not allowed");

      // Find the existing city
      var cityFromDb = await uow.CityRepository.FindCity(id);
      if (cityFromDb == null)
        return BadRequest("Update not allowed");

      // Update fields
      cityFromDb.LastUpdatedBy = 1;
      cityFromDb.LastUpdatedOn = DateTime.Now;

      // Map changes from DTO to entity
      mapper.Map(cityDto, cityFromDb);

      // Save changes
      await uow.SaveAsync();
      return StatusCode(200);
    }

    // PUT: api/city/updateCityName/{id}
    // Updates only the name of a city using a different DTO
    [HttpPut("updateCityName/{id}")]
    public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
    {
      var cityFromDb = await uow.CityRepository.FindCity(id);

      // Update meta fields
      cityFromDb.LastUpdatedBy = 1;
      cityFromDb.LastUpdatedOn = DateTime.Now;

      // Map updated name from CityUpdateDto
      mapper.Map(cityDto, cityFromDb);
      await uow.SaveAsync();
      return StatusCode(200);
    }

    // PATCH: api/city/update/{id}
    // Partially updates a city using a JSON Patch document
    [HttpPatch("update/{id}")]
    public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch)
    {
      var cityFromDb = await uow.CityRepository.FindCity(id);

      // Update meta fields
      cityFromDb.LastUpdatedBy = 1;
      cityFromDb.LastUpdatedOn = DateTime.Now;

      // Apply JSON Patch to the city object
      cityToPatch.ApplyTo(cityFromDb, ModelState);

      // Save changes
      await uow.SaveAsync();
      return StatusCode(200);
    }

    // DELETE: api/city/delete/{id}
    // Deletes a city by ID
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteCity(int id)
    {
      // Delete the city and save changes
      uow.CityRepository.DeleteCity(id);
      await uow.SaveAsync();

      // Return the deleted city ID
      return Ok(id);
    }
  }
}

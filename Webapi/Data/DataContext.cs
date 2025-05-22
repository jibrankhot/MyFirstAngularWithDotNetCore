using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
  // This class represents the Entity Framework Core database context
  // It manages the entity objects during runtime, including querying, saving, and relationships
  public class DataContext : DbContext
  {
    // Constructor that accepts DbContextOptions and passes them to the base class
    // These options are usually configured in the Startup.cs or Program.cs for dependency injection
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    // Represents the Cities table in the database
    public DbSet<City> Cities { get; set; }

    // Represents the Users table in the database
    public DbSet<User> Users { get; set; }

    // Represents the Properties table in the database
    public DbSet<Property> Properties { get; set; }

    // Represents the PropertyTypes table (e.g., Apartment, Villa, etc.)
    public DbSet<PropertyType> PropertyTypes { get; set; }

    // Represents the FurnishingTypes table (e.g., Fully-Furnished, Semi-Furnished)
    public DbSet<FurnishingType> FurnishingTypes { get; set; }
  }
}

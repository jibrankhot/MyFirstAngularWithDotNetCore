using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Extensions;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Services;

namespace WebAPI
{
  public class Startup
  {
    // Constructor to initialize configuration settings from appsettings.json or other sources
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // Method to register application services and middleware components
    public void ConfigureServices(IServiceCollection services)
    {
      // Retrieve the database connection string from configuration
      var builder = new SqlConnectionStringBuilder(Configuration.GetConnectionString("Default"));
      builder.Password = Configuration.GetSection("DBPassword").Value;
      var connectionString = builder.ConnectionString;

      // Register the DbContext with SQL Server as the database provider
      services.AddDbContext<DataContext>(options =>
          options.UseSqlServer(connectionString));

      // Add support for controllers and Newtonsoft.Json (for JSON patching and advanced serialization)
      services.AddControllers().AddNewtonsoftJson();

      // Enable Cross-Origin Resource Sharing (CORS)
      services.AddCors();

      // Register AutoMapper and map all profiles from the specified assembly
      services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

      // Register custom application services for dependency injection
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped<IPhotoService, PhotoService>();

      // Read the secret key for JWT token validation
      var secretKey = Configuration.GetSection("AppSettings:Key").Value;
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

      // Configure JWT-based authentication
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
          .AddJwtBearer(opt => {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuerSigningKey = true,  // Ensure the token has a valid signing key
              ValidateIssuer = false,           // Skip issuer validation
              ValidateAudience = false,         // Skip audience validation
              IssuerSigningKey = key            // Provide the key for signature validation
            };
          });
    }

    // Method to define the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      // Use custom exception handling middleware (defined in Extensions)
      app.ConfigureExceptionHandler(env);

      // Configure the middleware to route requests
      app.UseRouting();

      // Enable HSTS (HTTP Strict Transport Security)
      app.UseHsts();

      // Redirect HTTP requests to HTTPS
      app.UseHttpsRedirection();

      // Enable CORS to allow requests from any origin
      app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

      // Enable authentication and authorization middlewares
      app.UseAuthentication();
      app.UseAuthorization();

      // Enable serving default files (e.g., index.html) and static content (e.g., JS, CSS)
      app.UseDefaultFiles();
      app.UseStaticFiles();

      // Configure endpoints for controller-based routing
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

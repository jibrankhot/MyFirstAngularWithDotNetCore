# -------- Stage 1: Build --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["WebAPI.csproj", "./"]
RUN dotnet restore

# Copy the entire project and publish
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# -------- Stage 2: Runtime --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output
COPY --from=build /app/publish .

# Expose port 80 for the app
EXPOSE 80

# Entry point to run your API
ENTRYPOINT ["dotnet", "WebAPI.dll"]

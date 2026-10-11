FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY CampusEats.Api/CampusEats.Api.csproj CampusEats.Api/
RUN dotnet restore CampusEats.Api/CampusEats.Api.csproj

COPY CampusEats.Api/ CampusEats.Api/
WORKDIR /src/CampusEats.Api
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

CMD ["sh", "-c", "dotnet CampusEats.Api.dll --urls http://0.0.0.0:${PORT:-10000}"]

# Build context: repository root (SparkServer)
#   docker build -f src/WaitSpark.Api/Dockerfile -t waitspark-api .
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY src/WaitSpark.Common/*.csproj WaitSpark.Common/
COPY src/WaitSpark.Data/*.csproj WaitSpark.Data/
COPY src/WaitSpark.Api/*.csproj WaitSpark.Api/
RUN dotnet restore WaitSpark.Api/WaitSpark.Api.csproj

COPY src/WaitSpark.Common/ WaitSpark.Common/
COPY src/WaitSpark.Data/ WaitSpark.Data/
COPY src/WaitSpark.Api/ WaitSpark.Api/
RUN dotnet publish WaitSpark.Api/WaitSpark.Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app .

# Railway injects PORT; fall back to 8080 locally
ENV ASPNETCORE_URLS=http://+:8080
USER $APP_UID
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} exec dotnet WaitSpark.Api.dll"]

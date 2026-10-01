# Build context: repository root (SparkServer)
#   docker build -f src/WaitSpark.Scraper/Dockerfile -t waitspark-scraper .
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY src/WaitSpark.Common/*.csproj WaitSpark.Common/
COPY src/WaitSpark.Data/*.csproj WaitSpark.Data/
COPY src/WaitSpark.Scraper/*.csproj WaitSpark.Scraper/
RUN dotnet restore WaitSpark.Scraper/WaitSpark.Scraper.csproj

COPY src/WaitSpark.Common/ WaitSpark.Common/
COPY src/WaitSpark.Data/ WaitSpark.Data/
COPY src/WaitSpark.Scraper/ WaitSpark.Scraper/
RUN dotnet publish WaitSpark.Scraper/WaitSpark.Scraper.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/runtime:10.0 AS final
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
ENTRYPOINT ["dotnet", "WaitSpark.Scraper.dll"]

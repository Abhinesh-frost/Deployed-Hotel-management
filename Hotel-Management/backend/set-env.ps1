# set-env.ps1 - Environment Variables Setup Script
Write-Host "Setting environment variables for Hotel Management System..." -ForegroundColor Cyan

$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_NAME = "test_db"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "2003"
$env:SERVER_PORT = "8080"
$env:ALLOWED_ORIGINS = "http://localhost:4200"

Write-Host "✅ Environment variables set successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Current Environment Variables:" -ForegroundColor Yellow
Write-Host "DB_HOST: $env:DB_HOST"
Write-Host "DB_PORT: $env:DB_PORT"
Write-Host "DB_NAME: $env:DB_NAME"
Write-Host "DB_USERNAME: $env:DB_USERNAME"
Write-Host "SERVER_PORT: $env:SERVER_PORT"
Write-Host "ALLOWED_ORIGINS: $env:ALLOWED_ORIGINS"
Write-Host ""
Write-Host "You can now run the backend with: mvn spring-boot:run" -ForegroundColor Green

# Start Backend Server Script
# This script starts the Spring Boot backend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Le Mans Hotel - Starting Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking Maven..." -ForegroundColor Yellow
.\mvnw.cmd --version

Write-Host ""
Write-Host "Starting Spring Boot Application..." -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Green
Write-Host "Swagger UI: http://localhost:8080/swagger-ui.html" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Run the Spring Boot application
.\mvnw.cmd spring-boot:run

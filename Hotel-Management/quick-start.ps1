# Quick Start Script for Hotel Management System
# Run this script to set environment variables and check status

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Hotel Management System - Quick Start" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Set Environment Variables
Write-Host "[1/4] Setting environment variables..." -ForegroundColor Yellow
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_NAME = "test_db"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "2003"
$env:SERVER_PORT = "8080"
$env:ALLOWED_ORIGINS = "http://localhost:4200"
Write-Host "      ✅ Environment variables set" -ForegroundColor Green
Write-Host ""

# 2. Check Frontend Dependencies
Write-Host "[2/4] Checking frontend dependencies..." -ForegroundColor Yellow
$frontendPath = "frontend\lemans_hotel"
if (Test-Path "$frontendPath\node_modules") {
    Write-Host "      ✅ Frontend dependencies installed" -ForegroundColor Green
}
else {
    Write-Host "      ⚠️  Frontend dependencies NOT installed" -ForegroundColor Red
    Write-Host "      Run: cd frontend\lemans_hotel; npm install" -ForegroundColor Yellow
}
Write-Host ""

# 3. Check Backend
Write-Host "[3/4] Checking backend..." -ForegroundColor Yellow
if (Test-Path "backend\pom.xml") {
    Write-Host "      ✅ Backend project found" -ForegroundColor Green
}
else {
    Write-Host "      ❌ Backend project not found" -ForegroundColor Red
}
Write-Host ""

# 4. Display Summary
Write-Host "[4/4] Summary" -ForegroundColor Yellow
Write-Host ""
Write-Host "Environment Variables:" -ForegroundColor Cyan
Write-Host "  DB_HOST:         $env:DB_HOST" -ForegroundColor White
Write-Host "  DB_PORT:         $env:DB_PORT" -ForegroundColor White
Write-Host "  DB_NAME:         $env:DB_NAME" -ForegroundColor White
Write-Host "  DB_USERNAME:     $env:DB_USERNAME" -ForegroundColor White
Write-Host "  SERVER_PORT:     $env:SERVER_PORT" -ForegroundColor White
Write-Host "  ALLOWED_ORIGINS: $env:ALLOWED_ORIGINS" -ForegroundColor White
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if npm install is needed
if (-Not (Test-Path "$frontendPath\node_modules")) {
    Write-Host "1️⃣  Install Frontend Dependencies:" -ForegroundColor Yellow
    Write-Host "   cd frontend\lemans_hotel" -ForegroundColor White
    Write-Host "   npm install" -ForegroundColor White
    Write-Host ""
}

Write-Host "2️⃣  Run Backend (in this terminal):" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   mvn spring-boot:run" -ForegroundColor White
Write-Host ""

Write-Host "3️⃣  Run Frontend (in a new terminal):" -ForegroundColor Yellow
Write-Host "   cd frontend\lemans_hotel" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Access the application at:" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:4200" -ForegroundColor White
Write-Host "  Backend:  http://localhost:8080" -ForegroundColor White
Write-Host "  Swagger:  http://localhost:8080/swagger-ui/index.html" -ForegroundColor White
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Setup script completed!" -ForegroundColor Green
Write-Host ""

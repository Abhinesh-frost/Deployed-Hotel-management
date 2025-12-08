# Start Frontend Server Script
# This script starts the Angular development server with proxy configuration

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Le Mans Hotel - Starting Frontend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking Node and npm..." -ForegroundColor Yellow
node --version
npm --version

Write-Host ""
Write-Host "Starting Angular Development Server..." -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:4200" -ForegroundColor Green
Write-Host "Make sure the backend is running at: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Run the Angular development server with proxy
npm start

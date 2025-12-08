# Windows Environment Variables Setup Commands

## For Local Development (Windows PowerShell)

### Option 1: Set Environment Variables for Current PowerShell Session

```powershell
# Navigate to backend directory
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"

# Set environment variables for current session
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_NAME = "test_db"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "2003"
$env:SERVER_PORT = "8080"
$env:ALLOWED_ORIGINS = "http://localhost:4200"

# Verify variables are set
Write-Host "Environment Variables Set:"
Get-ChildItem Env: | Where-Object { $_.Name -match "DB_|SERVER_|ALLOWED_" }

# Run backend
mvn spring-boot:run
```

### Option 2: Set User Environment Variables (Persistent - Recommended)

```powershell
# Set user environment variables (persists across sessions)
[System.Environment]::SetEnvironmentVariable("DB_HOST", "localhost", "User")
[System.Environment]::SetEnvironmentVariable("DB_PORT", "3306", "User")
[System.Environment]::SetEnvironmentVariable("DB_NAME", "test_db", "User")
[System.Environment]::SetEnvironmentVariable("DB_USERNAME", "root", "User")
[System.Environment]::SetEnvironmentVariable("DB_PASSWORD", "2003", "User")
[System.Environment]::SetEnvironmentVariable("SERVER_PORT", "8080", "User")
[System.Environment]::SetEnvironmentVariable("ALLOWED_ORIGINS", "http://localhost:4200", "User")

Write-Host "✅ Environment variables set for user profile (persistent)"
Write-Host "⚠️ You may need to restart your terminal/IDE to see the changes"
```

### Option 3: Using a PowerShell Script (Easiest)

Save this as `set-env.ps1` in the backend directory:

```powershell
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
```

Then run it:

```powershell
# Navigate to backend directory
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"

# Run the script (dot-source to set variables in current session)
. .\set-env.ps1

# Now run the backend
mvn spring-boot:run
```

---

## Quick Commands

### 1️⃣ Install Frontend Dependencies

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"
npm install
```

### 2️⃣ Run Frontend (Development)

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"
npm start
```

### 3️⃣ Run Backend with Environment Variables

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"

# Set variables (choose one method from above)
# Option 1: Quick Session Variables
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_NAME = "test_db"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "2003"
$env:SERVER_PORT = "8080"
$env:ALLOWED_ORIGINS = "http://localhost:4200"

# Run backend
mvn spring-boot:run
```

### 4️⃣ Alternative: Run with Maven and Inline Variables

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"

mvn spring-boot:run `
  -Dspring-boot.run.arguments="--DB_HOST=localhost --DB_PORT=3306 --DB_NAME=test_db --DB_USERNAME=root --DB_PASSWORD=2003 --SERVER_PORT=8080 --ALLOWED_ORIGINS=http://localhost:4200"
```

---

## For Production Build (Frontend)

### Build for Production

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"

# Build the application
npm run build

# The output will be in: dist/lemans_hotel/browser/
```

### Build Backend JAR

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"

# Build JAR file
mvn clean package -DskipTests

# Run the JAR with environment variables
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_NAME = "test_db"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "2003"
$env:SERVER_PORT = "8080"
$env:ALLOWED_ORIGINS = "http://localhost:4200"

java -jar target\le_mans_hotel-0.0.1-SNAPSHOT.jar
```

---

## Using Windows GUI to Set Environment Variables

### Permanent System-Wide Variables

1. **Open System Properties:**
   - Press `Win + R`
   - Type: `sysdm.cpl`
   - Press Enter

2. **Environment Variables:**
   - Click "Advanced" tab
   - Click "Environment Variables" button

3. **Add Variables (User or System):**
   - Under "User variables" (recommended) or "System variables"
   - Click "New"
   - Add each variable:
     - Variable name: `DB_HOST`
     - Variable value: `localhost`
   - Repeat for all variables

4. **Apply Changes:**
   - Click OK on all dialogs
   - Restart your terminal/IDE

---

## Verify Environment Variables

### Check if Variables are Set

```powershell
# Check all environment variables
Get-ChildItem Env: | Where-Object { $_.Name -match "DB_|SERVER_|ALLOWED_" }

# Check specific variable
echo $env:DB_HOST

# Check all at once
Write-Host "DB_HOST: $env:DB_HOST"
Write-Host "DB_PORT: $env:DB_PORT"
Write-Host "DB_NAME: $env:DB_NAME"
Write-Host "DB_USERNAME: $env:DB_USERNAME"
Write-Host "SERVER_PORT: $env:SERVER_PORT"
Write-Host "ALLOWED_ORIGINS: $env:ALLOWED_ORIGINS"
```

---

## Troubleshooting

### Frontend TypeScript Errors

If you see TypeScript errors about missing modules:

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"

# Delete node_modules and package-lock
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall dependencies
npm install
```

### Backend Build Errors

If Maven build fails:

```powershell
cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"

# Clean and rebuild
mvn clean install -DskipTests
```

### Database Connection Issues

Make sure MySQL is running:

```powershell
# Check if MySQL service is running
Get-Service -Name "MySQL*"

# Start MySQL if not running
Start-Service -Name "MySQL80"  # Replace with your MySQL service name
```

---

## Complete Setup Script

Save this as `setup-and-run.ps1`:

```powershell
# Complete Setup and Run Script
Write-Host "Hotel Management System - Setup and Run" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Set environment variables
Write-Host "`n1. Setting environment variables..." -ForegroundColor Yellow
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_NAME = "test_db"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "2003"
$env:SERVER_PORT = "8080"
$env:ALLOWED_ORIGINS = "http://localhost:4200"
Write-Host "✅ Environment variables set" -ForegroundColor Green

# Check if node_modules exists
Write-Host "`n2. Checking frontend dependencies..." -ForegroundColor Yellow
$frontendPath = "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"
if (-Not (Test-Path "$frontendPath\node_modules")) {
    Write-Host "⚠️ Node modules not found. Installing..." -ForegroundColor Yellow
    cd $frontendPath
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Node modules already installed" -ForegroundColor Green
}

Write-Host "`n3. Backend is ready to run with:" -ForegroundColor Yellow
Write-Host "   cd 'c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend'" -ForegroundColor White
Write-Host "   mvn spring-boot:run" -ForegroundColor White

Write-Host "`n4. Frontend is ready to run with:" -ForegroundColor Yellow
Write-Host "   cd 'c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel'" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White

Write-Host "`nSetup complete! 🎉" -ForegroundColor Green
```

---

## Summary

**Recommended approach for local development:**

1. **One-time setup** (Persistent variables):
   ```powershell
   [System.Environment]::SetEnvironmentVariable("DB_HOST", "localhost", "User")
   [System.Environment]::SetEnvironmentVariable("DB_PORT", "3306", "User")
   [System.Environment]::SetEnvironmentVariable("DB_NAME", "test_db", "User")
   [System.Environment]::SetEnvironmentVariable("DB_USERNAME", "root", "User")
   [System.Environment]::SetEnvironmentVariable("DB_PASSWORD", "2003", "User")
   [System.Environment]::SetEnvironmentVariable("SERVER_PORT", "8080", "User")
   [System.Environment]::SetEnvironmentVariable("ALLOWED_ORIGINS", "http://localhost:4200", "User")
   ```

2. **Restart your terminal**

3. **Run the application:**
   ```powershell
   # Backend
   cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"
   mvn spring-boot:run
   
   # Frontend (in new terminal)
   cd "c:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"
   npm start
   ```

**Note:** For EC2/Linux deployment, refer to `EC2_DEPLOYMENT_GUIDE.md` which has Linux-specific commands.

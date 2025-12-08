# Environment Variables Setup Guide

Quick reference for setting up environment variables for cloud deployment.

## 🚀 Quick Start

### For Local Development (Windows)

Create a `.env` file in the backend directory with:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=test_db
DB_USERNAME=root
DB_PASSWORD=2003
SERVER_PORT=8080
ALLOWED_ORIGINS=http://localhost:4200
```

### For EC2 Deployment (Linux)

Choose one of the following methods:

---

## Method 1: Using /etc/environment (Recommended for Production)

```bash
# Edit the file
sudo nano /etc/environment

# Add these lines
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="hotel_db"
DB_USERNAME="hotel_user"
DB_PASSWORD="YourSecurePassword123!"
SERVER_PORT="8080"
ALLOWED_ORIGINS="http://YOUR_EC2_PUBLIC_IP"

# Apply changes
source /etc/environment

# Verify
echo $DB_HOST
```

---

## Method 2: Using ~/.bashrc (User-specific)

```bash
# Edit bashrc
nano ~/.bashrc

# Add at the end
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=hotel_db
export DB_USERNAME=hotel_user
export DB_PASSWORD=YourSecurePassword123!
export SERVER_PORT=8080
export ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP

# Apply changes
source ~/.bashrc

# Verify
env | grep DB_
```

---

## Method 3: Using Systemd Service File (Best for Services)

When creating the systemd service at `/etc/systemd/system/hotel-backend.service`:

```ini
[Service]
Environment="DB_HOST=localhost"
Environment="DB_PORT=3306"
Environment="DB_NAME=hotel_db"
Environment="DB_USERNAME=hotel_user"
Environment="DB_PASSWORD=YourSecurePassword123!"
Environment="SERVER_PORT=8080"
Environment="ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP"
```

---

## Method 4: Using Dedicated Script

```bash
# Create script
sudo mkdir -p /opt/hotel-app
sudo nano /opt/hotel-app/env.sh

# Add content:
#!/bin/bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=hotel_db
export DB_USERNAME=hotel_user
export DB_PASSWORD=YourSecurePassword123!
export SERVER_PORT=8080
export ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP

# Make executable
sudo chmod +x /opt/hotel-app/env.sh

# Use it
source /opt/hotel-app/env.sh
```

---

## 📋 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database server address | `localhost` or `your-db-server.com` |
| `DB_PORT` | Database port | `3306` |
| `DB_NAME` | Database name | `hotel_db` |
| `DB_USERNAME` | Database user | `hotel_user` |
| `DB_PASSWORD` | Database password | `YourSecurePassword123!` |
| `SERVER_PORT` | Backend server port | `8080` |
| `ALLOWED_ORIGINS` | Frontend URL for CORS | `http://YOUR_EC2_IP` |

---

## 🔧 Frontend Configuration

### Development (`src/environments/environment.ts`)
```typescript
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080'
};
```

### Production (`src/assets/config.js`)
```javascript
window.config = {
    apiUrl: 'http://YOUR_EC2_PUBLIC_IP:8080'
};
```

**Or** if using NGINX proxy:
```javascript
window.config = {
    apiUrl: ''  // Empty for relative URLs through proxy
};
```

---

## ✅ Verification Commands

```bash
# Check if variables are set
env | grep -E "DB_|SERVER_|ALLOWED_"

# Check specific variable
echo $DB_HOST

# Check systemd service variables
sudo systemctl show hotel-backend --property=Environment

# Test database connection
mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME
```

---

## 🔒 Security Best Practices

1. **Never commit** `.env` files or files containing passwords to Git
2. **Use strong passwords** for production databases
3. **Restrict database access** to localhost or specific IPs
4. **Use HTTPS** for `ALLOWED_ORIGINS` in production
5. **Rotate credentials** regularly
6. **Use AWS Secrets Manager** for sensitive data (advanced)

---

## 📝 Example: Complete Setup on EC2

```bash
# 1. Edit environment file
sudo nano /etc/environment

# 2. Add variables (replace YOUR_EC2_PUBLIC_IP)
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="hotel_db"
DB_USERNAME="hotel_user"
DB_PASSWORD="SecurePass123!"
SERVER_PORT="8080"
ALLOWED_ORIGINS="http://YOUR_EC2_PUBLIC_IP"

# 3. Load variables
source /etc/environment

# 4. Verify all are set
env | grep -E "DB_|SERVER_|ALLOWED_"

# 5. Start your application
cd /home/ubuntu/Hotel-Management/backend
java -jar target/*.jar
```

---

## 🐛 Troubleshooting

### Variables not loading?

```bash
# Method 1: Check syntax
cat /etc/environment | grep DB_HOST

# Method 2: Reload shell
exec bash

# Method 3: Source the file again
source /etc/environment

# Method 4: Check current environment
env | sort
```

### Application can't find variables?

```bash
# Run with explicit variables
DB_HOST=localhost DB_PORT=3306 java -jar target/*.jar

# Or use script
source /opt/hotel-app/env.sh && java -jar target/*.jar
```

---

## 📚 Additional Resources

- Full deployment guide: See `EC2_DEPLOYMENT_GUIDE.md`
- Backend config: `backend/src/main/resources/application.properties`
- Frontend config: `frontend/lemans_hotel/src/environments/`

---

**Remember:** Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 instance public IP address!

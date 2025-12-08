# EC2 Deployment Guide for Hotel Management System

This comprehensive guide will help you deploy the Hotel Management System on AWS EC2 with proper environment configuration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [EC2 Setup](#ec2-setup)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Database Setup](#database-setup)
5. [Backend Deployment](#backend-deployment)
6. [Frontend Deployment](#frontend-deployment)
7. [NGINX Configuration](#nginx-configuration)
8. [SSL/HTTPS Setup (Optional)](#ssl-https-setup-optional)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- AWS account with EC2 access
- Domain name (optional, but recommended for production)
- Basic knowledge of Linux/Ubuntu commands
- SSH client installed on your local machine

---

## EC2 Setup

### 1. Launch EC2 Instance

1. Log in to AWS Console and go to EC2
2. Click "Launch Instance"
3. **Configuration:**
   - **AMI:** Ubuntu Server 22.04 LTS
   - **Instance Type:** t2.medium (minimum) or t2.large (recommended)
   - **Storage:** 20 GB GP3
   - **Security Group:** Configure as follows:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | Your IP | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web access |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web access |
| Custom TCP | TCP | 8080 | 0.0.0.0/0 | Backend API (temporary) |
| Custom TCP | TCP | 3306 | Security Group | MySQL (internal only) |

4. Create or select a key pair and download the `.pem` file

### 2. Connect to EC2 Instance

```bash
# Change permissions on your key file
chmod 400 your-key.pem

# Connect to your EC2 instance
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### 3. Update System and Install Dependencies

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Java 17 (for Spring Boot)
sudo apt install openjdk-17-jdk -y

# Verify Java installation
java -version

# Install Maven
sudo apt install maven -y

# Install MySQL Server
sudo apt install mysql-server -y

# Install Node.js and npm (for Angular)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Verify Node and npm installation
node --version
npm --version

# Install NGINX
sudo apt install nginx -y

# Install Git
sudo apt install git -y
```

---

## Environment Variables Configuration

### Setting Environment Variables on Linux

There are three main ways to set environment variables on EC2:

#### Method 1: Using .env File (Recommended for Development)

Create a `.env` file in your project directory:

```bash
# Navigate to backend directory
cd /home/ubuntu/Hotel-Management/backend

# Create .env file
nano .env
```

Add the following content:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hotel_db
DB_USERNAME=hotel_user
DB_PASSWORD=YourSecurePassword123!

# Server Configuration
SERVER_PORT=8080
APP_NAME=Le_Mans_Hotel_Management

# Hibernate Configuration
HIBERNATE_DDL_AUTO=update
SHOW_SQL=false

# Mail Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_PASSWORD=your_app_password_here

# Logging Configuration
LOG_LEVEL=INFO
LOG_FILE_PATH=/var/log/hotel-app/application.log

# CORS Configuration
ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP
```

Save and exit (Ctrl+X, then Y, then Enter)

> **Note:** To use the `.env` file, you'll need to load it before running your application. See [Backend Deployment](#backend-deployment) section.

#### Method 2: System-Wide Environment Variables (Recommended for Production)

For persistent environment variables that survive reboots:

```bash
# Edit the environment file
sudo nano /etc/environment
```

Add your variables (one per line):

```bash
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="hotel_db"
DB_USERNAME="hotel_user"
DB_PASSWORD="YourSecurePassword123!"
SERVER_PORT="8080"
ALLOWED_ORIGINS="http://YOUR_EC2_PUBLIC_IP"
```

Apply changes:

```bash
# Reload environment
source /etc/environment

# Verify variables are set
echo $DB_HOST
```

#### Method 3: User-Specific Environment Variables

Edit the user's profile:

```bash
# Open bashrc file
nano ~/.bashrc
```

Add at the end of the file:

```bash
# Hotel Management Application Environment Variables
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=hotel_db
export DB_USERNAME=hotel_user
export DB_PASSWORD=YourSecurePassword123!
export SERVER_PORT=8080
export ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP
export MAIL_PASSWORD=your_app_password_here
```

Apply changes:

```bash
source ~/.bashrc
```

#### Method 4: Create a Dedicated Environment Script

```bash
# Create environment script
sudo nano /opt/hotel-app/env.sh
```

Add the content:

```bash
#!/bin/bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=hotel_db
export DB_USERNAME=hotel_user
export DB_PASSWORD=YourSecurePassword123!
export SERVER_PORT=8080
export ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP
export MAIL_PASSWORD=your_app_password_here
```

Make it executable:

```bash
sudo chmod +x /opt/hotel-app/env.sh
```

Use it before running your application:

```bash
source /opt/hotel-app/env.sh
```

---

## Database Setup

### 1. Secure MySQL Installation

```bash
sudo mysql_secure_installation
```

Follow the prompts:
- Set root password: Yes (choose a strong password)
- Remove anonymous users: Yes
- Disallow root login remotely: Yes
- Remove test database: Yes
- Reload privilege tables: Yes

### 2. Create Database and User

```bash
# Login to MySQL as root
sudo mysql -u root -p
```

Execute the following SQL commands:

```sql
-- Create database
CREATE DATABASE hotel_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'hotel_user'@'localhost' IDENTIFIED BY 'YourSecurePassword123!';

-- Grant privileges
GRANT ALL PRIVILEGES ON hotel_db.* TO 'hotel_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Verify database
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

### 3. Test Database Connection

```bash
mysql -u hotel_user -p hotel_db
```

Enter the password when prompted. If successful, you'll see the MySQL prompt.

---

## Backend Deployment

### 1. Clone Repository

```bash
# Navigate to home directory
cd /home/ubuntu

# Clone your repository
git clone https://github.com/YOUR_USERNAME/Hotel-Management.git

# Navigate to backend directory
cd Hotel-Management/backend
```

### 2. Set Environment Variables

Choose one of the methods from [Environment Variables Configuration](#environment-variables-configuration) section.

**Important**: Make sure to replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 public IP address!

### 3. Create Log Directory

```bash
sudo mkdir -p /var/log/hotel-app
sudo chown ubuntu:ubuntu /var/log/hotel-app
```

### 4. Build the Application

```bash
# Clean and build with Maven
mvn clean package -DskipTests
```

The JAR file will be created in `target/` directory.

### 5. Run the Backend

#### Option A: Run Directly (for testing)

```bash
# If using dedicated environment script
source /opt/hotel-app/env.sh

# Run the application
java -jar target/*.jar
```

#### Option B: Create Systemd Service (Recommended for Production)

Create a service file:

```bash
sudo nano /etc/systemd/system/hotel-backend.service
```

Add the following content:

```ini
[Unit]
Description=Hotel Management Backend
After=syslog.target network.target mysql.service

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Hotel-Management/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/Hotel-Management/backend/target/le_mans_hotel-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
TimeoutStopSec=10
Restart=on-failure
RestartSec=5

# Environment Variables
Environment="DB_HOST=localhost"
Environment="DB_PORT=3306"
Environment="DB_NAME=hotel_db"
Environment="DB_USERNAME=hotel_user"
Environment="DB_PASSWORD=YourSecurePassword123!"
Environment="SERVER_PORT=8080"
Environment="ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP"
Environment="MAIL_PASSWORD=your_app_password_here"

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable hotel-backend

# Start the service
sudo systemctl start hotel-backend

# Check status
sudo systemctl status hotel-backend

# View logs
sudo journalctl -u hotel-backend -f
```

### 6. Verify Backend is Running

```bash
# Test the API
curl http://localhost:8080/swagger-ui/index.html

# Or check if port is listening
sudo netstat -tulpn | grep 8080
```

---

## Frontend Deployment

### 1. Navigate to Frontend Directory

```bash
cd /home/ubuntu/Hotel-Management/frontend/lemans_hotel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API URL for Production

Edit the runtime configuration file:

```bash
nano src/assets/config.js
```

Update with your EC2 public IP:

```javascript
// Runtime configuration for production deployment
window.config = {
    apiUrl: 'http://YOUR_EC2_PUBLIC_IP:8080'
};
```

**Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 instance public IP address!**

### 4. Build for Production

```bash
# Build the Angular application
npm run build
```

The production files will be in `dist/lemans_hotel/browser/` directory.

### 5. Copy Build Files to NGINX Directory

```bash
# Create directory for the application
sudo mkdir -p /var/www/hotel-management

# Copy built files
sudo cp -r dist/lemans_hotel/browser/* /var/www/hotel-management/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/hotel-management
sudo chmod -R 755 /var/www/hotel-management
```

---

## NGINX Configuration

### 1. Create NGINX Configuration File

```bash
sudo nano /etc/nginx/sites-available/hotel-management
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;  # Replace with your IP or domain

    # Frontend - Angular Application
    location / {
        root /var/www/hotel-management;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Auth endpoints
    location /auth {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # User endpoints
    location /user {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin endpoints
    location /admin {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Public endpoints (images, etc.)
    location /public {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Swagger UI (optional, can be removed in production)
    location /swagger-ui {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # API docs
    location /v3/api-docs {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Increase max upload size for room images
    client_max_body_size 10M;
}
```

### 2. Enable the Configuration

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/hotel-management /etc/nginx/sites-enabled/

# Remove default configuration
sudo rm /etc/nginx/sites-enabled/default

# Test NGINX configuration
sudo nginx -t

# If test is successful, restart NGINX
sudo systemctl restart nginx

# Enable NGINX to start on boot
sudo systemctl enable nginx
```

### 3. Update Frontend Config to Use Relative URLs

Since NGINX is now proxying the API, update the config file:

```bash
sudo nano /var/www/hotel-management/assets/config.js
```

Change to use relative path (NGINX will proxy):

```javascript
// Runtime configuration - using NGINX proxy
window.config = {
    apiUrl: ''  // Empty string uses relative URLs through NGINX proxy
};
```

Or keep the full URL if you're not using the NGINX proxy:

```javascript
window.config = {
    apiUrl: 'http://YOUR_EC2_PUBLIC_IP:8080'
};
```

---

## SSL/HTTPS Setup (Optional)

### Prerequisites
- Domain name pointed to your EC2 IP address

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Obtain SSL Certificate

```bash
# Replace with your domain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

Certbot will automatically update your NGINX configuration.

### Auto-renewal

Certbot automatically sets up a cron job for renewal. Test it:

```bash
sudo certbot renew --dry-run
```

### Update Environment Variables for HTTPS

If using HTTPS, update your `ALLOWED_ORIGINS`:

```bash
ALLOWED_ORIGINS=https://yourdomain.com
```

And restart the backend:

```bash
sudo systemctl restart hotel-backend
```

---

## Troubleshooting

### Check Backend Logs

```bash
# If running as systemd service
sudo journalctl -u hotel-backend -f

# If running manually
tail -f /var/log/hotel-app/application.log
```

### Check NGINX Logs

```bash
# Error logs
sudo tail -f /var/log/nginx/error.log

# Access logs
sudo tail -f /var/log/nginx/access.log
```

### Common Issues

#### 1. Backend Not Starting

**Error:** "Port 8080 already in use"

```bash
# Find process using port 8080
sudo lsof -i :8080

# Kill the process
sudo kill -9 <PID>
```

#### 2. Database Connection Failed

**Error:** "Access denied for user"

```bash
# Check if MySQL is running
sudo systemctl status mysql

# Verify credentials
mysql -u hotel_user -p hotel_db

# Check if user has proper privileges
sudo mysql -u root -p
SHOW GRANTS FOR 'hotel_user'@'localhost';
```

#### 3. NGINX 502 Bad Gateway

- Ensure backend is running: `sudo systemctl status hotel-backend`
- Check backend logs: `sudo journalctl -u hotel-backend -f`
- Verify port 8080 is open: `sudo netstat -tulpn | grep 8080`

#### 4. Frontend Not Loading

```bash
# Check NGINX configuration
sudo nginx -t

# Restart NGINX
sudo systemctl restart nginx

# Verify files exist
ls -la /var/www/hotel-management
```

#### 5. CORS Errors

Update `ALLOWED_ORIGINS` environment variable and restart backend:

```bash
# Edit environment file or systemd service
export ALLOWED_ORIGINS=http://YOUR_EC2_IP,https://yourdomain.com

# Restart backend
sudo systemctl restart hotel-backend
```

#### 6. Environment Variables Not Loaded

```bash
# Verify variables are set
env | grep DB_

# If using bashrc
source ~/.bashrc

# If using environment file
source /etc/environment

# If using systemd, check service file
sudo systemctl show hotel-backend --property=Environment
```

---

## Environment Variables Quick Reference

### Required Environment Variables

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `DB_HOST` | `localhost` | Database host |
| `DB_PORT` | `3306` | Database port |
| `DB_NAME` | `hotel_db` | Database name |
| `DB_USERNAME` | `hotel_user` | Database username |
| `DB_PASSWORD` | `YourPassword123!` | Database password |
| `SERVER_PORT` | `8080` | Backend server port |
| `ALLOWED_ORIGINS` | `http://your-ip` | CORS allowed origins |

### Optional Environment Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `APP_NAME` | `Le_mans_Hotel_Management` | Application name |
| `HIBERNATE_DDL_AUTO` | `update` | Hibernate DDL mode |
| `SHOW_SQL` | `true` | Show SQL in logs |
| `MAIL_HOST` | `smtp.gmail.com` | Mail server host |
| `MAIL_PORT` | `587` | Mail server port |
| `MAIL_PASSWORD` | - | Email password |
| `LOG_LEVEL` | `INFO` | Logging level |
| `LOG_FILE_PATH` | `logs/application.log` | Log file path |

---

## Post-Deployment Checklist

- [ ] EC2 instance running and accessible
- [ ] Security groups properly configured
- [ ] Java, Maven, Node.js, MySQL, NGINX installed
- [ ] Environment variables set and verified
- [ ] Database created with proper user and permissions
- [ ] Backend application built and running
- [ ] Frontend built and deployed to NGINX
- [ ] NGINX configured and running
- [ ] API accessible through browser
- [ ] Frontend loads correctly
- [ ] Can create user account and login
- [ ] SSL certificate installed (if using HTTPS)
- [ ] Systemd service enabled for auto-start on reboot

---

## Maintenance Commands

### Restart Services

```bash
# Restart backend
sudo systemctl restart hotel-backend

# Restart NGINX
sudo systemctl restart nginx

# Restart MySQL
sudo systemctl restart mysql
```

### Update Application

```bash
# Pull latest code
cd /home/ubuntu/Hotel-Management
git pull

# Rebuild backend
cd backend
mvn clean package -DskipTests
sudo systemctl restart hotel-backend

# Rebuild frontend
cd ../frontend/lemans_hotel
npm run build
sudo cp -r dist/lemans_hotel/browser/* /var/www/hotel-management/
```

### Monitor Resources

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
top
```

---

## Security Recommendations

1. **Change default passwords** for database and application
2. **Use SSL/HTTPS** for production deployment
3. **Restrict SSH access** to specific IP addresses in security group
4. **Use environment variables** instead of hardcoding credentials
5. **Regular backups** of database
6. **Keep system updated**: `sudo apt update && sudo apt upgrade -y`
7. **Use AWS IAM roles** instead of access keys when possible
8. **Enable CloudWatch monitoring** for production
9. **Set up automated backups** for EC2 instance and database

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review application logs
3. Verify all environment variables are correctly set
4. Ensure all services are running

---

**Congratulations!** Your Hotel Management System is now deployed on AWS EC 2 and ready for production use! 🎉

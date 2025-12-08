# 🚀 Cloud Deployment Ready - Hotel Management System

## ✅ What's Changed

Your Hotel Management System is now **100% cloud deployment ready**! All hardcoded `localhost:8080` URLs have been replaced with environment-based configuration.

## 📚 Documentation

This project includes comprehensive deployment documentation:

### 1. **[EC2_DEPLOYMENT_GUIDE.md](./EC2_DEPLOYMENT_GUIDE.md)**
Complete step-by-step guide for deploying to AWS EC2, including:
- EC2 setup and security configuration
- Installing all dependencies
- Database setup
- Backend and frontend deployment
- NGINX configuration
- SSL/HTTPS setup
- Troubleshooting

### 2. **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)**
Quick reference for setting environment variables:
- 4 different methods for Linux/EC2
- Windows development setup
- Complete variable reference
- Verification commands
- Security best practices

## 🔧 Key Changes

### Frontend (Angular)
- ✅ Created environment files (`environment.ts`, `environment.prod.ts`)
- ✅ Created runtime config (`assets/config.js`) for post-deployment changes
- ✅ Updated all services to use environment variables
- ✅ Configured Angular for production builds

### Backend (Spring Boot)
- ✅ Database configuration uses environment variables
- ✅ Added CORS configuration for cloud deployment
- ✅ All sensitive data configurable via environment

## 🚀 Quick Start

### For Development (Windows)
```bash
# Frontend
cd frontend/lemans_hotel
npm install
npm start

# Backend  
cd backend
mvn spring-boot:run
```

Everything works as before - no changes needed for local development!

### For EC2 Deployment

1. **Read the deployment guide**: [EC2_DEPLOYMENT_GUIDE.md](./EC2_DEPLOYMENT_GUIDE.md)
2. **Set environment variables**: See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
3. **Deploy**: Follow the step-by-step instructions

## 🔐 Environment Variables

### Required for Production

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hotel_db
DB_USERNAME=hotel_user
DB_PASSWORD=YourSecurePassword123!

# Server
SERVER_PORT=8080

# CORS (replace with your EC2 IP or domain)
ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP
```

### Frontend Configuration (Production)

Edit `frontend/lemans_hotel/src/assets/config.js`:

```javascript
window.config = {
    apiUrl: 'http://YOUR_EC2_PUBLIC_IP:8080'
};
```

## 📋 Deployment Checklist

- [ ] Launch EC2 instance (Ubuntu 22.04 LTS recommended)
- [ ] Configure security groups (ports 22, 80, 443, 8080)
- [ ] Install dependencies (Java, Maven, Node.js, MySQL, NGINX)
- [ ] Set environment variables (see guide for 4 different methods)
- [ ] Create database and user
- [ ] Clone repository
- [ ] Build and deploy backend
- [ ] Build and deploy frontend
- [ ] Configure NGINX
- [ ] (Optional) Setup SSL with Certbot

## 🎯 What Makes It Cloud Ready?

1. **No Hardcoded URLs**: All configuration via environment variables
2. **Runtime Config**: Change API URL without rebuilding
3. **Environment Separation**: Different configs for dev/prod
4. **CORS Configured**: Secure cross-origin requests
5. **Production Optimized**: Best practices for security and performance

## 📖 Additional Resources

- **Deployment Guide**: Complete EC2 deployment instructions
- **Environment Setup**: All methods for setting variables
- **Troubleshooting**: Common issues and solutions
- **NGINX Config**: Production-ready reverse proxy setup
- **SSL Setup**: HTTPS with Let's Encrypt

## 🆘 Need Help?

1. Check the [Troubleshooting section](./EC2_DEPLOYMENT_GUIDE.md#troubleshooting) in the deployment guide
2. Verify environment variables are set correctly
3. Check service logs (backend, NGINX, MySQL)
4. Ensure security groups allow required traffic

## 🎉 Ready to Deploy!

Your application is now ready for production deployment on EC2. Follow the comprehensive guides for a smooth deployment experience.

**Important**: Remember to replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 instance public IP address throughout the configuration files!

---

**Happy Deploying! 🚀**

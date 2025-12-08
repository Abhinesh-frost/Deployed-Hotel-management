# Environment Variables Setup Guide

## Quick Setup

### 1. Database Configuration

The backend now supports environment variables for flexible configuration across different environments (development, staging, production).

### 2. Using Environment Variables

#### Option A: Using `.env` File (Recommended for Development)

1. Copy the template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update with your credentials:
   ```properties
   DB_URL=jdbc:mysql://localhost:3306/test_db?useSSL=false&allowPublicKeyRetrieval=true
   DB_USERNAME=root
   DB_PASSWORD=your_password
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   JWT_SECRET=your_secure_random_secret_key_at_least_32_chars
   ```

3. The application will automatically read these variables on startup

#### Option B: System Environment Variables (Recommended for Production)

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_password"
$env:MAIL_USERNAME="your_email@gmail.com"
$env:MAIL_PASSWORD="your_app_password"
$env:JWT_SECRET="your_secure_random_secret_key_at_least_32_chars"
```

**Linux/Mac:**
```bash
export DB_USERNAME=root
export DB_PASSWORD=your_password
export MAIL_USERNAME=your_email@gmail.com
export MAIL_PASSWORD=your_app_password
export JWT_SECRET=your_secure_random_secret_key_at_least_32_chars
```

#### Option C: IntelliJ IDEA / IDE

1. Go to Run → Edit Configurations
2. Add Environment Variables:
   ```
   DB_USERNAME=root;DB_PASSWORD=your_password;MAIL_USERNAME=your_email@gmail.com;JWT_SECRET=your_secret
   ```

### 3. Default Values

**Note:** Sensitive values (Passwords, Usernames, Secrets) **DO NOT** have defaults and **MUST** be provided via environment variables.

| Variable | Default Value |
|----------|--------------|
| `DB_URL` | `(None - Must be provided)` |
| `DB_USERNAME` | `(None - Must be provided)` |
| `DB_PASSWORD` | `(None - Must be provided)` |
| `MAIL_USERNAME` | `(None - Must be provided)` |
| `MAIL_PASSWORD` | `(None - Must be provided)` |
| `JWT_SECRET` | `(None - Must be provided)` |
| `MAIL_HOST` | `smtp.gmail.com` |
| `MAIL_PORT` | `587` |
| `SERVER_PORT` | `8080` |
| `HIBERNATE_DDL_AUTO` | `update` |
| `SHOW_SQL` | `true` |

### 4. Available Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `APP_NAME` | Application name | No | `Le_mans_Hotel_Management` |
| `DB_URL` | Database connection URL | **Yes** | `jdbc:mysql://localhost:3306/test_db...` |
| `DB_USERNAME` | Database username | **Yes** | `root` |
| `DB_PASSWORD` | Database password | **Yes** | `your_secure_password` |
| `MAIL_HOST` | SMTP server host | No | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP server port | No | `587` |
| `MAIL_USERNAME` | Email address for SMTP | **Yes** | `your_email@gmail.com` |
| `MAIL_PASSWORD` | Email password/app password | **Yes** | `your_app_password` |
| `JWT_SECRET` | JWT signing key | **Yes** | `random_string_min_32_chars` |
| `SERVER_PORT` | Application server port | No | `8080` |
| `HIBERNATE_DDL_AUTO` | Hibernate DDL mode | No | `update` |
| `SHOW_SQL` | Show SQL in console | No | `true` |
| `LOG_LEVEL` | Logging level | No | `INFO` |
| `LOG_FILE_PATH` | Log file location | No | `logs/application.log` |

### 5. Security Best Practices

1. **Never commit** `.env` files to version control
2. Add `.env` to `.gitignore`
3. Use strong, unique passwords
4. For Gmail, use **App-Specific Passwords**:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use that password in `MAIL_PASSWORD`
5. **JWT Secret**:
   - Must be at least 256 bits (32 characters) for HS256 algorithm
   - Generate using: `openssl rand -base64 32`

6. For production:
   - Use environment variables (not `.env` files)
   - Store secrets in secure vaults (AWS Secrets Manager, Azure Key Vault, etc.)
   - Change all default passwords
   - Set `SHOW_SQL=false`
   - Set `HIBERNATE_DDL_AUTO=validate`

### 6. Verification

After configuration, verify the setup:

1. Start the application:
   ```bash
   ./mvnw spring-boot:run
   ```

2. Check the console output for:
   - Database connection success
   - No credential errors
   - Application started on configured port

3. Test database connection:
   - Access http://localhost:8080/swagger-ui/index.html
   - Try creating/viewing data

### 7. Troubleshooting

**Issue: Database connection failed**
- Verify MySQL is running
- Check `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
- Ensure database exists: `CREATE DATABASE test_db;`

**Issue: Email not sending**
- Verify SMTP credentials
- For Gmail, use App-Specific Password
- Check firewall/network settings

**Issue: Environment variables not loading**
- Restart the application after setting variables
- Check variable names (case-sensitive)
- Verify `.env` file location (same directory as `pom.xml`)

---

## Example Configuration Files

### Development `.env`
```properties
DB_URL=jdbc:mysql://localhost:3306/test_db?useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=dev_password_123
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=dev.hotel@gmail.com
MAIL_PASSWORD=app_specific_password_here
JWT_SECRET=dev_secret_key_must_be_very_long_and_secure_for_hs256
SERVER_PORT=8080
HIBERNATE_DDL_AUTO=update
SHOW_SQL=true
LOG_LEVEL=DEBUG
```

### Production (System Environment Variables)
```bash
export DB_URL="jdbc:mysql://prod-db-server:3306/hotel_prod_db?useSSL=true"
export DB_USERNAME="hotel_app_user"
export DB_PASSWORD="super_secure_prod_password"
export MAIL_HOST="smtp.gmail.com"
export MAIL_PORT="587"
export MAIL_USERNAME="hotel.lemans@company.com"
export MAIL_PASSWORD="production_app_password"
export JWT_SECRET="prod_secret_key_must_be_very_long_and_secure_generated_randomly"
export SERVER_PORT="8080"
export HIBERNATE_DDL_AUTO="validate"
export SHOW_SQL="false"
export LOG_LEVEL="WARN"
```

---

For complete documentation, see `.env.example` file.

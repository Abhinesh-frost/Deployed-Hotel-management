# Le Mans Hotel Management System
## Project Setup & Execution Guide

This document provides a neat and clean, step-by-step guide to setting up and running the Le Mans Hotel Management System.

---

### 1. Prerequisites

Before starting, ensure you have the following installed on your system:

*   **Java Development Kit (JDK)**: Version 17 or higher.
*   **Node.js**: Version 18 or higher (includes `npm`).
*   **MySQL Server**: For the database.
*   **Git**: For version control.

---

### 2. Environment Configuration

The backend requires specific environment variables to function correctly (Database, Email, Security).

#### 2.1 Variables Guide
| Variable | Description | Required | Example Value |
| :--- | :--- | :--- | :--- |
| `DB_URL` | MySQL Connection URL | **Yes** | `jdbc:mysql://localhost:3306/test_db?useSSL=false` |
| `DB_USERNAME` | MySQL Username | **Yes** | `root` |
| `DB_PASSWORD` | MySQL Password | **Yes** | `your_password` |
| `MAIL_USERNAME` | Gmail Address | **Yes** | `your.email@gmail.com` |
| `MAIL_PASSWORD` | Gmail App Password | **Yes** | `abcd efgh ijkl mnop` |
| `JWT_SECRET` | Secret Key for Tokens | **Yes** | `Use_a_secure_random_string_at_least_32_chars` |

#### 2.2 Setup Instructions (Recommended)
1.  Navigate to the `backend` directory.
2.  Create a file named `.env` (copy from `.env.example` if available).
3.  Add the variables in the following format:

    ```properties
    DB_URL=jdbc:mysql://localhost:3306/test_db?useSSL=false&allowPublicKeyRetrieval=true
    DB_USERNAME=root
    DB_PASSWORD=your_password
    MAIL_USERNAME=your_email@gmail.com
    MAIL_PASSWORD=your_app_password
    JWT_SECRET=your_secure_random_secrect_key_at_least_32_chars
    ```
    *(Note: Replace the example values with your actual credentials)*

---

### 3. Backend Setup (Spring Boot)

#### Step 3.1: Prepare Database
1.  Open your MySQL Client.
2.  Create the database:
    ```sql
    CREATE DATABASE test_db;
    ```

#### Step 3.2: Start the Backend
1.  Open a terminal (PowerShell).
2.  Navigate to the `backend` directory:
    ```powershell
    cd "C:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\backend"
    ```
3.  Run the start script:
    ```powershell
    .\start-backend.ps1
    ```

**Success Indicator**: The console shows "Started HotelManagementApplication" (Port 8080).

---

### 4. Frontend Setup (Angular)

#### Step 4.1: Install Dependencies
1.  Open a **new** terminal window.
2.  Navigate to the `frontend` directory:
    ```powershell
    cd "C:\Users\Admin\Desktop\Cloud Deployed\Hotel-Management\frontend\lemans_hotel"
    ```
3.  Install packages:
    ```bash
    npm install
    ```

#### Step 4.2: Start the Frontend
1.  Run the application:
    ```bash
    npm start
    ```

**Success Indicator**: The server listens on `http://localhost:4200`.

---

### 5. Accessing the Application

*   **User UI**: [http://localhost:4200](http://localhost:4200)
*   **Swagger API Docs**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

### 6. Troubleshooting

*   **Database Error**: Check `DB_URL` and credentials in `.env`. Ensure MySQL is running.
*   **Email Error**: Use a Google **App Password** for `MAIL_PASSWORD` if using Gmail with 2FA.
*   **Port In Use**: Close other apps using ports 8080 or 4200.



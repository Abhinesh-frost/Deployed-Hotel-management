# 🏨 Le Mans Hotel Management System

A comprehensive full-stack hotel management solution featuring a Spring Boot backend and an Angular frontend.

## 🚀 Project Overview

The **Le Mans Hotel Management System** streamlines hotel operations for administrators and provides a seamless booking experience for guests.
- **Admin Panel:** Manage rooms, bookings, offers, and view analytics.
- **User Portal:** Browse rooms, make reservations, and manage bookings.
- **AI Integration:** Smart chatbot assistance for both admins and users.

---

## 🛠️ Technology Stack

### Backend
- **Framework:** Spring Boot 3.2.5
- **Language:** Java 17
- **Database:** MySQL
- **Security:** Spring Security + JWT
- **Documentation:** Swagger UI / OpenAPI

### Frontend
- **Framework:** Angular 17+
- **Language:** TypeScript
- **Styling:** Modern CSS with Glassmorphism
- **State Management:** RxJS

---

## ⚙️ Setup & Installation Guide

Follow these steps to set up the project from scratch.

### 1. Prerequisites
Ensure you have the following installed:
- **Java JDK 17+**
- **Node.js (v18+) & npm**
- **MySQL Server**
- **Maven** (optional, wrapper included)
- **Angular CLI** (`npm install -g @angular/cli`)

### 2. Database Setup
1. Open your MySQL Workbench or terminal.
2. Create the database:
   ```sql
   CREATE DATABASE test_db;
   ```
3. The tables will be automatically created by Hibernate when the backend starts.

### 3. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Open `src/main/resources/application.properties` and configure your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/test_db
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD
   ```
3. Run the backend application:
   - **Windows:**
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - **Mac/Linux:**
     ```bash
     ./mvnw spring-boot:run
     ```
4. The backend will start on `http://localhost:8080`.

### 4. Frontend Setup
1. Open a new terminal and navigate to the `frontend/lemans_hotel` directory:
   ```bash
   cd frontend/lemans_hotel
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Open your browser and visit `http://localhost:4200`.

---

## � Key URLs

- **Frontend Application:** [http://localhost:4200](http://localhost:4200)
- **Backend API:** [http://localhost:8080](http://localhost:8080)
- **Swagger API Docs:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## � Default Credentials

**Admin Account:**
- You may need to register a new user and manually update their role to `ADMIN` in the database, or use the default admin if seeded.
- **Role Update SQL:** `UPDATE users SET role = 'ADMIN' WHERE email = 'your_email@example.com';`

---

## 📄 Documentation
For detailed project documentation, API endpoints, and architecture, refer to the `Project_Manual.md` file included in the documentation folder.

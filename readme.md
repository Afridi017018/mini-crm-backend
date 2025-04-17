## Project Overview

This repository contains the **frontend** and **backend** code for the **Mini CRM** application, a lightweight customer relationship management system built with modern web technologies. The frontend is a ReactJS application styled with Tailwind CSS, and the backend is a Node.js and Express RESTful API with PostgreSQL as the database. Token-based authentication secures protected routes, and an admin-only CSV upload feature allows for efficient bulk import of up to 1 million customer records.

## Repository Links

- **Frontend:** https://github.com/Afridi017018/mini-crm-frontend
- **Backend:** https://github.com/Afridi017018/mini-crm-backend

## Core Features

1. **Customer Management**
   - Add, edit, and delete customers.  
   - Fields: `name`, `email`, `phone`, `company`, `tags`.
2. **Tagging System**
   - Assign multiple tags to each customer (`Lead`, `Prospect`, `Client`).
   - Filter customers by one or more tags.
3. **Search & Filter**
   - Search customers by `name`, `email`, or `phone`.
   - Filter based on assigned tags.
4. **CSV Upload (Admin Panel)**
   - Bulk upload CSV files containing up to 1 million customer records.
   - Server-side validation: email format, required fields, duplicate handling.
   - Progress summary: total processed, skipped, failed.
5. **Backend API**
   - RESTful API built with Node.js and Express.
   - PostgreSQL for data persistence.
   - Token-based authentication for protected routes.
6. **Frontend**
   - ReactJS with hooks and functional components.
   - Tailwind CSS for responsive, utility-first styling.
   - Pages: Dashboard, Customers, Upload (admin only), Login.

## Tech Stack & Tools

- **Frontend:**
  - ReactJS
  - React Router
  - Tailwind CSS
  - react-icons
- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - pg (node-postgres)
  - Multer (file uploads)
  - jsonwebtoken


## Setup & Run Instructions (Locally)

### Prerequisites
- Node.js v16+
- npm or yarn
- PostgreSQL (or Neon.tech connection)

### Backend
1. Clone the repo:
   ```bash
   git clone https://github.com/Afridi017018/mini-crm-backend
   cd mini-crm-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
```env
DATABASE_URL=postgresql://postgres:root@localhost:5432/minicrmtest1
PG_USER=postgres
PG_PASSWORD=root
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=minicrmtest1
JWT_SECRET=your_jwt_secret
PORT=5000
```
4. Start the server (with auto-reload):
   ```bash
   npm run dev
   ```

### Frontend
1. Clone the repo:
   ```bash
   git clone https://github.com/Afridi017018/mini-crm-frontend
   cd mini-crm-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
### Test Accounts
- **Admin**: user id `admin`, password `admin`
- **User**: user id `user`, password `user`

## CSV Upload Instructions
1. Navigate to the **Upload** page (admin only).
2. Select a CSV file matching the format:
   ```csv
   name,email,phone,company,tags
   John Doe,john@example.com,1234567890,Acme Inc,Lead
   Jane Smith,jane@example.com,0987654321,Beta LLC,Client
   ```
3. Click **Upload CSV**.
4. View the summary of processed, skipped, and failed records.
5. You can download a sample CSV file to test the upload functionality:  
   [Download Sample CSV](https://drive.google.com/file/d/1tvXxprJDRyLxcdv682ZBYeiLmrElt6Ry/view?usp=sharing)

## Known Limitations & Improvements
 
- **No undo for bulk deletes.**  
- **Tagging is single-select;** could be multi-select.  
.  
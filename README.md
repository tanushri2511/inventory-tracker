# inventory-tracker

SQL-based inventory tracking application with Express + React + MySQL  
A full-stack inventory management system built with Node.js, Express, React (Vite), and MySQL. This project helps you track products, manage stock levels, and generate inventory reports.

---

## Features

- **Add, edit, and delete products** with full CRUD functionality
- **Real-time stock tracking** with automatic quantity updates
- **Inventory reports**:
  - Summary report (total items, total value)
  - Low-stock items report
- **Database-driven storage** using MySQL via WAMP server
- **Clean and responsive UI** built with React and Vite
- **Separate frontend and backend** for scalable architecture

---

## Tech Stack

| Layer       | Technology               |
|------------|--------------------------|
| Frontend    | React + Vite             |
| Backend     | Node.js + Express        |
| Database    | MySQL (via WAMP)         |
| API         | RESTful JSON API         |
| Styling     | CSS                      |

---

## Project Structure

```text
inventory-tracker/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── .gitignore
└── README.md
```

---

## Installation

### Prerequisites

- **WAMP Server** (with MySQL installed)
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git**

### Step 1: Set Up MySQL Database

1. Open **WAMP Server** and ensure **MySQL** is running.
2. Open **phpMyAdmin** (usually at `http://localhost/phpmyadmin`).
3. Create a new database named:

   ```sql
   CREATE DATABASE inventory_tracker;
   ```

4. Run the database schema:

   - Open `database/schema.sql` in MySQL or phpMyAdmin.
   - Execute the SQL to create tables (`products`, etc.).

5. (Optional) Load sample data:

   - Execute `database/seed.sql` to insert demo products.

### Step 2: Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder with the following content:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=inventory_tracker
   ```

   Adjust `DB_PASSWORD` if your MySQL has a password set.

4. Start the backend server:

   ```bash
   npm start
   ```

   The API will run at `http://localhost:5000`.

Available API endpoints (example):

- `GET /api/products` – Get all products
- `POST /api/products` – Add a new product
- `PUT /api/products/:id` – Update a product
- `DELETE /api/products/:id` – Delete a product
- `GET /api/reports/summary` – Get inventory summary
- `GET /api/reports/low-stock` – Get low-stock items

### Step 3: Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173` (Vite default).

4. In the frontend, configure the API URL to point to your backend:

   - In `src/api.js` or relevant config, set:

     ```js
     const API_URL = 'http://localhost:5000';
     ```

---

## Usage

1. Ensure **MySQL is running** via WAMP.
2. Start the **backend** (`npm start` in `backend/`).
3. Start the **frontend** (`npm run dev` in `frontend/`).
4. Open the frontend URL in your browser.
5. Use the UI to:
   - Add new products
   - Update stock quantities
   - View inventory reports

---

## Screenshots

_(Add screenshots of your app here once you have them.)_

Example:

```text
[screenshot of product list]
[screenshot of add product form]
[screenshot of low-stock report]
```

---

## Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=inventory_tracker
```

**Do not commit `.env` to GitHub.** It is already ignored by `.gitignore`.

---

## License

This project is open source and available for educational and personal use.

---

## Author

**Tanu Shri (tanushri2511)**  
Location: Chennai, Tamil Nadu, India  
Project: Inventory Tracker – SQL + Express + React

---

## Future Enhancements

- User authentication and role-based access
- Barcode scanning for products
- Export reports to CSV/Excel
- More detailed analytics and charts
- Mobile-friendly responsive design

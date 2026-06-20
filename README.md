# inventory-tracker

SQL-based inventory tracking application with Express, React, and MySQL.

This project is a full-stack inventory management system designed to manage products, track stock quantities, and view inventory-related data through a web interface. It uses a React frontend, an Express backend, and MySQL as the database.

---

## Features

- Add new products to inventory
- View all products in a structured interface
- Update product details and stock quantity
- Delete products when needed
- Track inventory records using MySQL
- Connect frontend and backend using REST APIs

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MySQL |
| Styling | CSS |
| Tools | WAMP, Git, GitHub |

---

## Project Structure

```text
inventory-tracker/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── api.js
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── .gitignore
└── README.md
```

---

## Prerequisites

Before running this project, make sure the following are installed on your system:

- Node.js
- npm
- WAMP or any MySQL server setup
- Git
- A code editor such as Visual Studio Code

---

## Database Setup

1. Start WAMP and make sure MySQL is running.
2. Open phpMyAdmin.
3. Create a database named `inventory_tracker`.
4. Import or run the SQL file used for table creation.
5. If sample data is available, run the seed file.

---

## Backend Setup

1. Open the terminal in the `backend` folder.

   ```bash
   cd backend
   ```

2. Install backend dependencies.

   ```bash
   npm install
   ```

3. Configure your local database connection settings as required by the project.

4. Start the backend server.

   ```bash
   npm start
   ```

The backend server will run on the configured local port.

---

## Frontend Setup

1. Open the terminal in the `frontend` folder.

   ```bash
   cd frontend
   ```

2. Install frontend dependencies.

   ```bash
   npm install
   ```

3. Start the frontend development server.

   ```bash
   npm run dev
   ```

The frontend will open in the browser using the local development URL provided by Vite.

---

## How to Run the Project

1. Start MySQL using WAMP.
2. Make sure the database is created and tables are imported.
3. Run the backend server.
4. Run the frontend server.
5. Open the frontend in the browser.
6. Test adding, viewing, editing, and deleting inventory items.

---

## API Overview

Some common backend routes used in the project may include:

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

These routes handle communication between the frontend and the database through the backend.

---

## GitHub Notes

This project is uploaded to GitHub for version control and project sharing.

Files included in the repository:
- Source code
- Configuration files
- SQL files
- README
- `.gitignore`

Files excluded from the repository:
- `node_modules`
- local environment files
- log files
- build folders

---

## Future Improvements

- Add authentication for admin access
- Add dashboard analytics
- Add low-stock alerts
- Export reports to Excel or CSV
- Improve mobile responsiveness

---

## Author

**Tanu Shri**

GitHub: [tanushri2511](https://github.com/tanushri2511)

---

## License

This project is for learning and academic/project demonstration purposes.

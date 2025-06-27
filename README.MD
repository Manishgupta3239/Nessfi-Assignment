#  E-Commerce Product Catalog Application

This is a full-stack e-commerce product catalog system developed as part of an interview assignment. It includes secure user authentication, product management via a RESTful API, and a React-based frontend with Tailwind styling.

---

##  Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Frontend:** React.js, Vite, Tailwind CSS, Zustand, Axios
- **Other:** REST Client, Postman, GitHub

---

## ✨ Features

###  Authentication
- User Signup/Login with JWT
- Protected routes on backend & frontend
- Logout functionality

###  Product Catalog
- CRUD Operations on products
- Pagination with `?page=1&limit=5`
- Validation for all required fields
- Responsive and dynamic UI

---

##  Folder Structure

Assignment/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── .env
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── store/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── tailwind.config.js
└── README.md


---

##  Getting Started

##  Backend Setup

```bash
cd backend
npm install

PORT=3000
MONGO_URI=mongodb://localhost:27017/Assignement
JWT_SECRET=4eff0af50e4e6ef15b94ae2cdd0683f6e7fc6dcd5c7867b968d1d9b05809078e66a6552036fd11f6ee1f5a58da71536ed7188d03f29cf9c6a5846fedaea8ca1d

npm run dev

## Frontend Setup

cd frontend
npm install
npm run dev
Runs at: http://localhost:5173


 API Endpoints

 Auth
POST /api/auth/register

POST /api/auth/login

 Products
POST /api/products

GET /api/products?page=1&limit=5

GET /api/products/:id

PUT /api/products/:id

DELETE /api/products/:id


Sample Product Payload

{
  "name": "T-shirt",
  "description": "Cotton half sleeve",
  "price": 499,
  "currency": "INR",
  "category": "Clothing",
  "brand": "Roadster",
  "sku": "TSHIRT001",
  "stock_quantity": 25,
  "images": ["https://example.com/image.jpg"],
  "tags": ["summer", "men"],
  "is_active": true
}

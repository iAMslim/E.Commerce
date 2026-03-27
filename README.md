E-Commerce Book Store

A full-stack web application where users can browse books, manage a cart, place orders, and view order history.

Features
User authentication (login and register)
Browse books
Add books to cart
Update cart quantities
Remove items from cart
Checkout to create orders
View order history
View order details
Responsive navigation
Tech Stack

Frontend:

React
Redux Toolkit (RTK Query)
Material UI

Backend:

Node.js
Express

Database:

PostgreSQL
Prisma ORM
Installation

Clone the repository:

git clone https://github.com/iAMslim/E.Commerce.git

cd E.Commerce

Install dependencies:

npm install
cd server
npm install

Environment Variables

Create a .env file in the server folder:

DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key

Run the App

Start backend:
Start frontend:

npm run start

API Routes

Auth:
POST /auth/register
POST /auth/login
GET /auth/me

Books:
GET /books
GET /books/:id

Cart:
GET /cart
POST /cart
PUT /cart/:id
DELETE /cart/:id

Orders:
GET /orders
POST /orders/checkout
GET /orders/:id

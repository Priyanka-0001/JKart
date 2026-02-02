# JKart – JavaScript Based E-Commerce Application

## Description 
JKart is a frontend-only e-commerce web application built using HTML, CSS, and JavaScript.
It allows users to register, log in, browse products, add items to the cart, update quantities, and view cart details.
All data is stored and managed using browser localStorage, without any backend or database.
This project focuses on core JavaScript concepts, DOM manipulation, event handling, and end-to-end application flow.


## Features
- User Registration with duplicate email check
- User Login with credential validation
- Persistent user and cart data using localStorage
- Product listing fetched from external API
- Add to Cart with quantity control (+ / −)
- Cart count update in real-time
- Remove items from cart
- Grand total calculation in cart
- Separate pages for Login, Register, Home, and Cart


## Technologies Used
- HTML5 – Structure
- CSS3 – Styling and responsive layout
- JavaScript (ES6) – Logic & Interactivity
- Fetch API – Product data retrieval
- Browser localStorage – Data persistence


## Project Structure
JKart/
│
├── Login.html        # User login page
├── Register.html     # User registration page
├── Homepage.html     # Product Listing 
├── Cart.html         # Cart management page
│
├── Login.css
├── Register.css
├── Cart.css
│
├── JKart.js
│
└── README.md


## Application Flow
1. Registration
    - User enters details
    - Email is checked for duplicates
    - User data saved in localStorage
    - Redirects to Login page
2. Login
    - Credentials validated from stored users
    - Logged-in user saved in localStorage
    - Redirects to Homepage
3. Homepage
    - Products fetched from dummyjson API
    - Products displayed dynamically
    - Users can add products to cart
    - Quantity buttons appear after adding
4. Cart Page
    - Cart items loaded from localStorage
    - Quantity increase/decrease supported
    - Remove product option
    - Grand total displayed


## How to Run the Project
1. Download or clone the project
2. Open Register.html or Login.html in browser
3. Register a new user
4. Login and browse products
5. Add products to cart and manage quantities
- No server or backend setup required

## Usage
Open Login.html directly in a browser or use Live Server in VS Code.

## Key Concepts Implemented
- DOM Manipulation
- Event Handling
- Array methods (find, filter, some)
- JSON.stringify() & JSON.parse()
- LocalStorage CRUD operations
- Conditional rendering
- Page-based logic execution


## Future Enhancements
- Logout functionality
- User-specific cart handling
- Backend integration
- Order history
- Improved UI animations
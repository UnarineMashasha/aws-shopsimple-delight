ShopSimple

A responsive static e-commerce website built with React, Tailwind CSS, and React Router. Users can browse a catalogue, create an order, confirm and submit it, and review their order history. The site has no backend: data is mocked and orders are stored in the browser's localStorage, so it deploys as plain static files to AWS S3 + CloudFront.

Live demo: coming-soon

Features
Home: hero section, featured products, and a "How it works" overview
Catalogue: product grid with search and category filter
Create Order: cart with quantity controls and a running total
Confirm and Submit: order summary, validated customer details form, and success page with a generated order ID
Order History: all past orders with expandable item details and an empty state
Contact Us: validated contact form with a front-end success message
Fully responsive layout with a shared navbar and footer
Tech Stack
Area	Technology
Framework	React
Styling	Tailwind CSS
Routing	React Router
State	React Context (cart)
Persistence	Browser localStorage
Hosting	AWS S3 + CloudFront
Project Structure
src/
├── components/     # Navbar, Footer, ProductCard, CartItem, etc.
├── context/        # CartContext (cart state and actions)
├── data/           # Mock product data
├── pages/          # Home, Catalogue, Order, Confirm, OrderHistory, Contact
├── App.tsx         # Routes
└── main.tsx        # Entry point
Getting Started
Prerequisites
Node.js 18 or later
npm

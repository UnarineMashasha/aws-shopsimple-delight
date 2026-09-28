# ShopSimple Delight

Build a clean, modern, responsive static website for a small online store called "ShopSimple". Use React with Tailwind CSS and React Router. No backend is required: use mock data and browser localStorage for persistence, so the site can be deployed as static files (for example to AWS S3 and CloudFront).

Pages and navigation
A top navbar with links to Home, Catalogue, Order History, and Contact Us, plus a cart icon showing the item count.

Home: Hero section with a headline, short tagline, and a "Browse Catalogue" button. Below it, a featured products section (3 to 4 items) and a short "How it works" section (Browse, Order, Confirm).

Catalogue: Grid of 8 to 12 mock products, each with an image, name, price, and an "Add to Order" button. Include a simple search box and category filter.

Create Order: Opened from the cart icon. It shows the items with quantity controls (add, remove, delete), a running total, and a "Review Order" button.

Confirm and Submit: A summary page listing all items, quantities, and the total, plus a form for name, email, and delivery address with validation. Include "Back to Edit" and "Confirm and Submit Order" buttons. On submit, save the order to localStorage with a generated order ID, date, status "Submitted", and the items. Then show a success page with the order ID and clear the cart.

Order History: A table or list of all past orders from localStorage (order ID, date, total, status), with the option to expand an order and see its items. Show a friendly empty state if there are no orders.

Contact Us: A form with name, email, and message, with validation and a success message on submit (front-end only). Also show placeholder address, phone, and email details.

Design
Use a consistent colour palette, rounded cards, subtle shadows, and a footer with the site name and quick links. The layout must be mobile-friendly, and the code should be organised into reusable components with a cart context or state manager.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5843f1ad-4ce5-48c4-bb7c-b07959fc0de8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

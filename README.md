# Keychains By Bogy LLC - E-commerce Website

Welcome to the Keychains By Bogy LLC e-commerce platform! This website allows customers to browse and purchase a variety of keychains and accessories directly from our store.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## About the Project

This e-commerce website is designed to provide a seamless shopping experience for customers looking to purchase unique keychains and related products. The platform is built with modern web technologies to ensure fast performance and secure transactions.

## Features

- **Product Catalog**: Browse products stored in Firestore, complete with images and descriptions.
- **Dynamic Carousel**: Homepage features a carousel with images that can be updated via the admin site.
- **Secure Payments**: Integrated with PayPal for secure and reliable payment processing.
- **Data Integrity**: Backend server validates data against the database before finalizing transactions.
- **Responsive Design**: Optimized for viewing on desktops, tablets, and mobile devices.

## Built With

- **Frontend**:

  - [Vite](https://vitejs.dev/)
  - HTML5, CSS3, JavaScript (ES6+)

- **Backend**:

  - [Express.js](https://expressjs.com/)
  - [Node.js](https://nodejs.org/)

- **Database**:

  - [Firestore](https://firebase.google.com/docs/firestore)

- **Storage**:

  - [Amazon S3](https://aws.amazon.com/s3/) for hosting images

- **Payment Integration**:
  - [PayPal API](https://developer.paypal.com/)

## Getting Started

To set up the project locally, follow these steps.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- Accounts and credentials for Firebase, AWS S3, and PayPal.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tm-LBenson/keychains-by-bogy.git
   cd keychains-by-bogy
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_APP_API_BASE_URL=
   VITE_APP_PAYPAL_CLIENT_ID=
   VITE_GOOGLE_API_KEY=
   ```

4. **Run the Application**

   ```bash
   npm run dev
   ```

   The website should now be running at `http://localhost:3000`.

## Usage

- **Access the Site**: Open `http://localhost:3000` in your web browser.
- **Browse Products**: View the catalog of keychains and add items to your cart.
- **Dynamic Carousel**: Enjoy the homepage carousel showcasing featured products.
- **Checkout Process**: Use PayPal for secure payment processing.
- **Data Validation**: The server ensures all transaction data is valid before completion.

## License

This project is provided as-is without any warranty. While contributions and collaborations are not accepted, you are welcome to use the code as a template for your own projects.


Thank you for your interest in Keychains By Bogy LLC!

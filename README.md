# PERN Stack E-commerce Store

A full-stack e-commerce application built with PostgreSQL, Express, React, and Node.js (PERN Stack).

## 📖 Overview

This project is a complete e-commerce solution featuring product management with CRUD operations, optimized front-end rendering, and secure backend implementation. It uses Neon PostgreSQL for database operations and includes modern UI components with DaisyUI and Tailwind CSS.

## 🚀 Features

- **Product Management**: Create, read, update, and delete products
- **Responsive Design**: Fully responsive UI adapting to all screen sizes
- **Performance Optimized**: Lazy loading and pagination to optimize memory usage
- **User-friendly Interface**: Clean, intuitive user experience
- **Real-time Feedback**: Loading states and error notifications
- **Security Measures**: API protection with Arcjet

## 💻 Tech Stack

### Backend

- **Node.js & Express**: Server framework
- **PostgreSQL (Neon)**: Cloud SQL database
- **Arcjet**: Rate limiting and API protection
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

### Frontend

- **React 19**: UI library
- **Vite 6**: Build tool and development environment
- **Zustand**: State management
- **Axios**: HTTP client
- **React Router 7**: Navigation
- **TailwindCSS**: Utility-first CSS framework
- **DaisyUI**: UI component library
- **React Hot Toast**: Notification system
- **Lucide-React**: Icon library

## 🛠️ Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/pern-store.git
   cd pern-store
   ```

2. Install dependencies

   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   ```

3. Set up environment variables
   Create a .env file in the root directory with the following variables:

   ```
   PORT=8080
   PGUSER=your_db_user
   PGPASSWORD=your_db_password
   PGHOST=your_db_host
   PGDATABASE=your_db_name
   ARCJET_KEY=your_arcjet_key
   NODE_ENV=development
   ```

4. Start the development server

   ```bash
   # Start backend server (from root directory)
   npm run dev

   # Start frontend development server (from client directory)
   npm run dev
   ```

## 🗄️ Database Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 🔐 API Endpoints

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | /api/products     | Get all products       |
| GET    | /api/products/:id | Get a specific product |
| POST   | /api/products     | Create a new product   |
| PUT    | /api/products/:id | Update a product       |
| DELETE | /api/products/:id | Delete a product       |

## 📱 Performance Optimization

This application implements several performance optimizations:

- **Pagination**: Limit products loaded at once
- **Image Lazy Loading**: Load images only when needed
- **Component Memoization**: Prevent unnecessary re-renders
- **Code Splitting**: Reduce initial bundle size
- **Production Builds**: Optimized for deployment

## 🚀 Deployment

The application is configured for production deployment:

1. Build the client

   ```bash
   cd client
   npm run build
   ```

2. Start the server in production mode
   ```bash
   # From the root directory
   NODE_ENV=production npm start
   ```

## 🧪 Future Enhancements

- User authentication and authorization
- Shopping cart functionality
- Payment gateway integration
- Search and filtering capabilities
- Admin dashboard
- Order management system

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [n1shan1](https://github.com/n1shan1)

---

Made with ❤️ using the PERN Stack

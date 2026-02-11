# 🍔 DevBurger - Burger Shop System

<div align="center">

![DevBurger Logo](https://img.shields.io/badge/DevBurger-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yMCA4SDRjLS41NSAwLTEgLjQ1LTEgMXYxYzAgLjU1LjQ1IDEgMSAxaDE2Yy41NSAwIDEtLjQ1IDEtMVY5YzAtLjU1LS40NS0xLTEtMXptLTktNkM4LjM1IDIgNiA0LjM1IDYgN2gxMmMwLTIuNjUtMi4zNS01LTUtNXpNNSAxMnYxMGgxNFYxMkg1em0yIDhoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem00IDRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem00IDRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvc3ZnPg==)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

[![Deploy Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![Deploy Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[🌐 Live Application](https://devburger-interface-plum.vercel.app) · [📡 API](https://devburger-api-gcz9.onrender.com)

</div>

---

## 📋 About the Project

**DevBurger** is a complete burger shop management system built with cutting-edge technologies. The application allows customers to place orders online with secure authentication and integrated payment processing, while administrators manage products, categories, and orders in real-time.

https://github.com/user-attachments/assets/faf594a9-dd11-4a5a-a4b7-b92ce677d3ec

---

## ✨ Features

### 👤 Customer
- ✅ Registration and login with JWT authentication
- ✅ Product listing by category
- ✅ Shopping cart
- ✅ Order checkout with Stripe payment integration
- ✅ Order history

### 👨‍💼 Administrator
- ✅ Real-time order dashboard
- ✅ Product management (create, edit, delete)
- ✅ Category management
- ✅ Product image upload
- ✅ Order status control

---

## 🚀 Technologies Used

### Frontend
| Technology | Version | Usage |
|-----------|--------|-----|
| [React](https://reactjs.org/) | 18.x | User interface |
| [Vite](https://vitejs.dev/) | 5.x | Build tool and bundler |
| [React Router DOM](https://reactrouter.com/) | 6.x | Page navigation |
| [Axios](https://axios-http.com/) | 1.x | HTTP requests |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Form management |
| [Yup](https://github.com/jquense/yup) | 1.x | Data validation |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | - | Notifications |
| [Styled Components](https://styled-components.com/) | - | Styling |

### Databases
| Database | Service | Usage |
|-------|---------|-----|
| [PostgreSQL](https://www.postgresql.org/) | [Neon](https://neon.tech/) | Relational data (users, products, orders) |
| [MongoDB](https://www.mongodb.com/) | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | Non-relational data |

### DevOps & Deployment
| Service | Usage |
|---------|-----|
| [Render](https://render.com/) | Backend deployment (Node.js) |
| [Vercel](https://vercel.com/) | Frontend deployment (React) |
| [GitHub](https://github.com/) | Version control |

---

## 🏗️ Project Architecture

```
DevBurger/
├── devburger-interface/        # Frontend (React + Vite)
    ├── src/
    │   ├── assets/             # Images, logos and icons
    │   ├── components/         # Reusable components (Button, etc)
    │   ├── config/             # Frontend configuration
    │   ├── containers/         # Application pages (Login, Home, Admin)
    │   ├── hooks/              # Custom Hooks (Context API)
    │   ├── layouts/            # Shared layouts between pages
    │   ├── routes/             # React Router DOM configuration
    │   ├── services/
    │   │   └── api.js          # Axios client configuration
    │   ├── styles/             # Global styles and themes
    │   ├── utils/              # Utility functions and helpers
    │   └── main.jsx            # Application entry point
    ├── public/                 # Static public files
    ├── .env                    # Environment variables (local)
    └── package.json            # Frontend dependencies
```

---

## 🔄 Application Flow

```
Client (Vercel)
      ↓ HTTPS Request
Backend API (Render)
      ↓                    ↓
PostgreSQL (Neon)    MongoDB (Atlas)
```

---

## ⚙️ Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [PostgreSQL](https://www.postgresql.org/) installed locally
- [MongoDB](https://www.mongodb.com/) installed locally
- [Git](https://git-scm.com/)

### Frontend

```bash
# Clone the repository
git clone https://github.com/julianamilhomens/devburger-interface.git
cd devburger-interface

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with the backend URL

# Run in development mode
npm run dev
```

---

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3001
```

---

## 🌐 Deployment

The application is available in production:

- **Frontend**: [https://devburger-interface-plum.vercel.app](https://devburger-interface-plum.vercel.app)
- **Backend**: [https://devburger-api.onrender.com](https://devburger-api-gcz9.onrender.com)

---

## 🧪 Test Credentials

Want to try the application? Use these test accounts:

### 👤 Customer Account
Access the customer experience with full shopping capabilities:
```
Email: user@email.com
Password: 12345678
```

**What you can do:**
- ✅ Browse products by categories
- ✅ Add items to shopping cart
- ✅ Place orders with Stripe test payments
- ✅ View order history and status
- ✅ Update profile information

### 👨‍💼 Administrator Account
Access the admin dashboard with management privileges:
```
Email: admin@email.com
Password: 12345678
```

**What you can do:**
- ✅ View real-time order dashboard
- ✅ Manage products (create, edit, delete)
- ✅ Manage categories with image upload
- ✅ Update order status workflow
- ✅ Upload and manage product images
- ✅ View sales analytics

> **Note**: This is a test environment. Feel free to explore all features! Test payment cards are available for checkout simulation.

---

## 🔗 Quick Access

| Resource | Link | Description |
|----------|------|-------------|
| 🌐 Live App | [devburger-interface-plum.vercel.app](https://devburger-interface-plum.vercel.app) | Production frontend |
| 📡 API | [devburger-api.onrender.com](https://devburger-api-gcz9.onrender.com) | Backend API |
| 📖 API Docs | [Backend README](https://github.com/julianamilhomens/devburger-api) | API documentation |
| 💳 Test Cards | [Stripe Test Cards](https://stripe.com/docs/testing#cards) | For payment testing |

---

## 👩‍💻 Author

<div align="center">
  <img src="https://github.com/julianamilhomens.png" width="100px" style="border-radius: 50%" alt="Juliana Milhomens"/>
  <br/>
  <strong>Juliana Milhomens</strong>
  <br/>

[![GitHub](https://img.shields.io/badge/GitHub-julianamilhomens-181717?style=for-the-badge&logo=github)](https://github.com/julianamilhomens)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-julianamilhomens-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/julianamilhomens)
</div>

---

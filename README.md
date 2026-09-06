# Basic E-Commerce Backend API

A secure, functional RESTful API designed to power a basic e-commerce application platform. This backend system is built using the **Node.js**, **Express.js**, and **MongoDB/Mongoose** ecosystem, prioritizing industry-standard backend development practices.

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Distinct permissions configured for **Admin** and **User** accounts using custom middleware components.
*   **Complete Product CRUD:** Full administrative management for creating, reading, updating, and deleting system products.
*   **Draft/Publish Control:** Allows Admins to keep products safely hidden (`published: false`) until they are completely ready for user visibility.
*   **Advanced Catalog Querying:** Implements client-side features including:
    *   **Filtering:** Multi-variable targeting by category, minPrice, and maxPrice.
    *   **Sorting:** Arranging items via lowest price first, highest price first, or newest releases.
    *   **Pagination:** Safe batch-loading of results using structured pages and limits.
*   **Secure Authentication:** Secure user registration and login workflows utilizing `bcrypt` password hashing and signed JSON Web Tokens (JWT).

## 🛠️ Tech Stack
*   **Runtime Environment:** Node.js
*   **Backend Framework:** Express.js
*   **Database:** MongoDB
*   **ODM Library:** Mongoose
*   **Security & Auth:** Bcrypt & JSON Web Tokens (JWT)

# E-Commerce Product Management Dashboard (SSR — Next.js)

A server-rendered product management and admin dashboard built using Next.js App Router, Prisma, PostgreSQL (Neon), Cloudinary, and NextAuth.

This project simulates a real-world inventory and product management system with:

- Product CRUD operations
- Multi-step product form with validation
- Stock analytics and dashboard metrics
- Cloudinary-based image upload handling
- Admin account management
- Public customer product storefront

---

## Live Deployment

Live Application:  
< add deployed link here >

---

## Dummy Admin Credentials (For Evaluation)

Use the following credentials to log in to the admin dashboard:

**Email:** < add demo admin email here >  
**Password:** < add demo admin password here >

_(These credentials are created only for demonstration purposes.)_

---

## Demo Video

Demo Video Link (3–5 mins):  
< add YouTube / Google Drive link here >

The demo showcases:

- Admin login
- Adding, editing, and deleting products
- Image upload and preview
- Stock metrics and dashboard analytics
- Customer storefront view
- Admin creation workflow
- Logout and redirect flow

---

## Features

### Product Management (CRUD)

- Create, edit, and delete products
- Multi-step product form
- Image upload and preview
- Real-time stock and inventory updates

**Product fields include:**

- Name
- Description
- Category
- Price
- Stock
- Image URL

---

### Product Form Validation

Validation implemented using React Hook Form + Zod schema.

| Field           | Rule                    |
| :-------------- | :---------------------- |
| **name**        | required, non-empty     |
| **description** | required, non-empty     |
| **category**    | required, non-empty     |
| **price**       | positive number         |
| **stock**       | integer, non-negative   |
| **imageUrl**    | required Cloudinary URL |

---

### Dashboard Analytics

The dashboard displays:

- Total number of products
- Total inventory items
- Total stock value
- Average item price
- Low-stock products
- Out-of-stock products

---

### Image Upload Handling

- Images are uploaded via an API route
- Stored securely in Cloudinary
- Stored as URL references in database
- Preview shown before submitting
- Optimized using next/image

---

### Admin Management

- Create new admin accounts
- Form-driven admin registration
- Automatic dashboard refresh post-creation
- Secure dashboard access
- Logout with redirect to storefront

---

### Customer Product Storefront

- Public homepage displaying product list
- Product cards with:
  - Image
  - Description
  - Price
  - Stock
- Accessible via dashboard navigation
- Admin logout redirects to storefront

---

## Tech Stack

**Frontend**

- Next.js (App Router, SSR)
- React
- React Query
- Tailwind CSS

**Backend**

- Prisma ORM
- PostgreSQL (Neon)
- Next.js Server Actions
- API Routes

**Authentication**

- NextAuth

**Validation**

- Zod
- React Hook Form

**Media Storage**

- Cloudinary

---

## Database

Database is managed using Prisma migrations.

**Product Model Includes:**

- id, name, description, category, price, stock, imageUrl, createdAt, updatedAt

**Admins include:**

- name, email, password

---

## Environment Variables

Create a .env file with:

DATABASE_URL=

AUTH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

---

## Running the Project Locally

1. Install dependencies:
   npm install

2. Run database migrations:
   npx prisma migrate deploy

3. Start development server:
   npm run dev

Application runs at: http://localhost:3000

---

## Deployment

Deployment services:

- Vercel — application hosting
- Neon — PostgreSQL database
- Cloudinary — image storage

---

## Deliverables

- GitHub Repository (complete source code)
- README Documentation
- Working SSR Application
- Live Deployment
- Demo Video
- Dummy Admin Credentials

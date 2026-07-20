# Premium Real Estate CMS Platform (MERN Stack)

A modern, highly responsive Real Estate Content Management System (CMS) built with the MERN stack (MongoDB, Express, React, Node.js). 

The public website's design is inspired by high-end residential listings, utilizing a premium warm earthy palette (bronze, gold, and beige) and a clean geometric grid layout. The CMS dashboard provides full CRUD capabilities to manage all sections of the landing page dynamically from a local MongoDB database.

---

## Folder Structure

```
├── client/              # React (Vite) Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI Components (Navbar, Footer, Modals, Sidebar)
│   │   ├── pages/       # LandingPage, CMS Dashboard Page
│   │   ├── App.jsx      # React router configuration
│   │   ├── main.jsx     # Frontend entry point
│   │   └── index.css    # Tailwind CSS + custom fonts (Outfit, Inter)
│   └── package.json
│
└── server/              # Node.js + Express Backend (MVC Architecture)
    ├── config/          # Database configuration (db.js)
    ├── controllers/     # Controller layer (CRUD controller factory)
    ├── models/          # Mongoose model schemas
    ├── routes/          # Express routing (api.js)
    ├── scripts/         # DB Seed script
    ├── .env             # Server variables
    └── package.json
```

---

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router DOM, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)

---

## Getting Started

### Prerequisites
- Node.js installed on your machine
- Local MongoDB instance running on your machine (default port: `27017`)

---

### Step 1: Set Up and Start Backend Server

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Check the `.env` file configuration:
   ```env
   
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Note: On first start, the server will detect if your database is empty and automatically seed it with sample data matching the reference layout!*

---

### Step 2: Set Up and Start Frontend Client

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL in your browser (usually `http://localhost:5173`).

---

## Features

### 1. Public Website Sections
- **Hero**: Codename Title, Subtitle, description, and action buttons.
- **About**: Description list with stats blocks (ongoing project size, happy families) and building photo.
- **Connectivity**: Location overview displaying travel times categories (Connectivity, Education, Recreation).
- **Gallery**: Photo grid showcasing the building renders.
- **Amenities**: Grid of 9 border-accented lifestyle amenity blocks.
- **Floor Plans**: Interactive pricing matrix table and unit configuration cards (1 RK, 1 BHK, 2 BHK) with layout plans.
- **MahaRERA Banner**: Regulatory notice with a scan QR code.
- **Developer**: Swastik Group overview, legacy statements, and consultant profiles.
- **Footer**: Swastik Group office addresses, quick links, and legal/copyright information.

### 2. CMS Dashboard Features
- **Section Management**: CRUD (Create, Read, Update, Delete) forms for:
  - Hero banner
  - About project
  - Services list
  - Properties (Floor Plans)
  - Projects (Gallery)
  - Testimonials
  - FAQ list
  - Contact Details
- **Customer Inquiries**: Inquiries submitted on the landing page form are stored in the database and can be reviewed or deleted directly from this panel.

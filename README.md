# IRE Homes Frontend Application

IRE Homes Frontend is a modern, high-performance client-facing web application built with **Next.js** (App Router). It serves as the public website displaying real estate house types, news posts, and dynamic page sections fetched securely from the backend CMS via **GraphQL**, utilizing **Incremental Static Regeneration (ISR)** and an automated revalidation API route.

---

## 🚀 Key Features & Capabilities

* **Next.js App Router Architecture:** Leverages modern React server and client components located under `src/app/`.
* **Dynamic Content via GraphQL:** Integrates with backend data layers using custom GraphQL queries (`src/lib/graphql.js`).
* **Incremental Static Regeneration (ISR):** Fast page rendering with instant on-demand cache updates triggered via the `/api/revalidate` route.
* **Interactive Components:** Features dynamic UI elements like the custom cross-fade `ImageCarousel` component (`src/components/imageCarousel.js`).
* **Public Views:** Fully optimized pages for home, about, contact, house types, and news.
* **Automated CI/CD & Testing:** Includes a GitHub Actions CI pipeline (`.github/workflows/ci.yml`) and GraphQL test suites (`src/lib/tests/graphql.test.js`).

---

## ⚡ Performance, Efficiency & Responsiveness

* **Optimized Rendering & Speed:** Built using Next.js App Router to maximize server-side rendering (SSR) and Incremental Static Regeneration (ISR), resulting in lightning-fast initial load times and minimal client-side JavaScript overhead.
* **Fully Responsive Design:** Developed using Tailwind CSS, ensuring fluid layouts, adaptive grids, and touch-friendly UI elements that scale seamlessly across mobile, tablet, and desktop viewports.
* **Efficient Asset Management:** Utilizes modern image handling techniques and custom lightweight components (such as the cross-fade `ImageCarousel`) to keep rendering overhead low and performance scores high.

---

## 🌐 Hosted Demo

The frontend application is deployed and hosted live on **Vercel**:
* **Live Public Website:** [https://cms-frontend-nine-gray.vercel.app/](https://cms-frontend-nine-gray.vercel.app/)
---

## 🤖 AI Usage Note
AI was used strictly as an assistant and productivity tool to accelerate boilerplate generation, component styling, and test setup. The core frontend architecture, routing patterns, GraphQL integration, and optimization strategy were designed and structured independently.

---

## 📁 Directory Structure

```text
├── .github/workflows/       # GitHub Actions CI workflow (ci.yml)
├── public/                  # Static assets and favicons
├── src/
│   ├── app/                 # Next.js App Router views
│   │   ├── about/           # About page
│   │   ├── api/revalidate/  # ISR revalidation endpoint route
│   │   ├── contact/         # Contact page
│   │   ├── house-types/     # Real estate property listings
│   │   ├── news/            # News and blog articles
│   │   ├── favicon.ico      # Site icon
│   │   ├── globals.css      # Global Tailwind/CSS styles
│   │   ├── layout.js        # Root layout wrapper
│   │   └── page.js          # Homepage view
│   ├── components/          # Reusable UI components
│   │   └── imageCarousel.js # Cross-fade image carousel component
│   └── lib/                 # Utility files and test suites
│       ├── tests/           # Unit and integration tests (graphql.test.js)
│       └── graphql.js       # GraphQL client query handlers
├── .env.local               # Local environment variables
├── .gitignore               # Git ignore rules
└── eslint.config.mjs        # ESLint configuration

```

---

## 🛠️ Step-by-Step Local Setup & Installation

### Step 1: Prerequisites

* **Node.js** (v18+ recommended)
* A running instance of the **IRE Homes CMS Backend** (for GraphQL data queries)



### Step 2: Clone & Install Dependencies

Clone your repository locally and install the required modules:

```bash
git clone <repository-url>
cd cms-frontend
npm install

```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory of the frontend project. Add your backend GraphQL endpoint and revalidation secret:

```env
# Backend API / GraphQL Endpoint URL
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql

# Secret token required to trigger ISR revalidation matching the backend
REVALIDATION_TOKEN=your_frontend_revalidation_secret

```

### Step 4: Run the Development Server

Start the Next.js development server:

```bash
npm run dev

```

Open your browser and navigate to `http://localhost:3001` (or the assigned local port).

---

## ☁️ Deployment Guide (Vercel)

This frontend application is optimized for deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the project into your **Vercel Dashboard**.
3. Configure project settings:
* **Framework Preset:** `Next.js`
* **Root Directory:** `./` (or your frontend folder root)
* **Build Command:** `npm run build`


4. Add your production environment variables (`NEXT_PUBLIC_GRAPHQL_ENDPOINT` and `REVALIDATION_TOKEN`) under the **Environment Variables** section in Vercel.
5. Click **Deploy**. Vercel will automatically build and globally deploy your Next.js application with edge caching and ISR support.

---

## 🧪 Testing & Quality Assurance

* **Run Test Suite:** Execute automated component and GraphQL integration tests:
```bash
npm test

```


* **Lint Code:** Check code quality and formatting rules using ESLint:
```bash
npx eslint .

```


* **CI Pipeline:** The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically runs tests and builds on every push to verify deployment stability.

# IRE Homes Frontend Application

IRE Homes Frontend is a modern, high-performance client-facing web application built with **Next.js** (App Router)[cite: 4]. It serves as the public website displaying real estate house types[cite: 1], news posts[cite: 1], and dynamic page sections[cite: 1] fetched securely from the backend CMS via **GraphQL**[cite: 4], utilizing **Incremental Static Regeneration (ISR)**[cite: 1] and an automated revalidation API route[cite: 4].

---

## 🚀 Key Features & Capabilities

* **Next.js App Router Architecture:** Leverages modern React server and client components located under `src/app/`[cite: 4].
* **Dynamic Content via GraphQL:** Integrates with backend data layers using custom GraphQL queries (`src/lib/graphql.js`)[cite: 4].
* **Incremental Static Regeneration (ISR):** Fast page rendering with instant on-demand cache updates triggered via the `/api/revalidate` route[cite: 4].
* **Interactive Components:** Features dynamic UI elements like the custom cross-fade `ImageCarousel` component (`src/components/imageCarousel.js`)[cite: 1, 4].
* **Public Views:** Fully optimized pages for home, about, contact, house types, and news[cite: 4].
* **Automated CI/CD & Testing:** Includes a GitHub Actions CI pipeline (`.github/workflows/ci.yml`) and GraphQL test suites (`src/lib/tests/graphql.test.js`)[cite: 4].

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
├── .github/workflows/       # GitHub Actions CI workflow (ci.yml)[cite: 4]
├── public/                  # Static assets and favicons[cite: 4]
├── src/
│   ├── app/                 # Next.js App Router views[cite: 4]
│   │   ├── about/           # About page[cite: 4]
│   │   ├── api/revalidate/  # ISR revalidation endpoint route[cite: 4]
│   │   ├── contact/         # Contact page[cite: 4]
│   │   ├── house-types/     # Real estate property listings[cite: 4]
│   │   ├── news/            # News and blog articles[cite: 4]
│   │   ├── favicon.ico      # Site icon[cite: 4]
│   │   ├── globals.css      # Global Tailwind/CSS styles[cite: 4]
│   │   ├── layout.js        # Root layout wrapper[cite: 4]
│   │   └── page.js          # Homepage view[cite: 4]
│   ├── components/          # Reusable UI components[cite: 4]
│   │   └── imageCarousel.js # Cross-fade image carousel component[cite: 1, 4]
│   └── lib/                 # Utility files and test suites[cite: 4]
│       ├── tests/           # Unit and integration tests (graphql.test.js)[cite: 4]
│       └── graphql.js       # GraphQL client query handlers[cite: 4]
├── .env.local               # Local environment variables[cite: 4]
├── .gitignore               # Git ignore rules[cite: 4]
└── eslint.config.mjs        # ESLint configuration[cite: 4]

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

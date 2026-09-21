# Lumiere Jewellery Admin

A modern and responsive jewellery administration portal built with **React, Vite, JavaScript, Tailwind CSS, and shadcn/ui**.

The project provides a reusable UI foundation for managing jewellery products, categories, inventory, customers, orders, and other administrative operations.

## 🚀 Tech Stack

* **React** — UI library
* **Vite** — Development server and build tool
* **JavaScript** — Project language
* **Tailwind CSS** — Utility-first CSS framework
* **shadcn/ui** — Reusable UI components
* **Radix UI** — Accessible component primitives
* **Nova** — shadcn/ui preset
* **Lucide React** — Icons
* **React Router DOM** — Application routing
* **Recharts** — Charts and data visualization
* **Class Variance Authority (CVA)** — Component variants
* **clsx / tailwind-merge** — Conditional and merged Tailwind classes

## 📁 Project Structure

```text
lumiere-jewellery-admin/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── form.jsx
│   │       └── ...
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   └── utils.js
│   │
│   ├── pages/
│   │
│   ├── layouts/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── components.json
├── jsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 UI & Component System

This project uses **shadcn/ui with the Radix UI component library and Nova preset**.

Components are maintained directly inside the project, allowing the UI to be customized according to the application's requirements.

### Current UI approach

```text
shadcn/ui
     │
     ├── Nova preset
     │
     ├── Radix UI primitives
     │
     ├── Tailwind CSS
     │
     └── Custom application styling
```

## 🧩 Adding shadcn Components

To add a new shadcn component:

```bash
npx shadcn@latest add <component-name>
```

For example:

```bash
npx shadcn@latest add button
```

```bash
npx shadcn@latest add card
```

```bash
npx shadcn@latest add form
```

Multiple components can be added together:

```bash
npx shadcn@latest add button card input form select table dialog
```

Components are generated inside:

```text
src/components/ui/
```

## 📦 Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

Check your versions:

```bash
node -v
npm -v
git --version
```

### Clone the Repository

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd lumiere-jewellery-admin
```

### Install Dependencies

```bash
npm install
```

## ▶️ Run the Project

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🧭 Routing

The application uses **React Router DOM** for navigation.

Example:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/products" element={<Products />} />
    <Route path="/categories" element={<Categories />} />
  </Routes>
</BrowserRouter>
```

## 🧱 Reusable Components

Reusable components should be placed in:

```text
src/components/
```

shadcn/ui components should be placed in:

```text
src/components/ui/
```

Application-specific components can be organized separately:

```text
src/components/
├── layout/
├── dashboard/
├── products/
├── customers/
└── common/
```

## 🎯 Admin Portal Modules

The planned administration portal can include:

### Dashboard

* Sales overview
* Revenue
* Orders
* Customers
* Inventory summary
* Sales charts

### Products

* Add jewellery
* Edit jewellery
* Delete jewellery
* Product images
* Product categories
* Product pricing
* Product details

### Categories

* Category management
* Subcategories
* Category status

### Inventory

* Stock management
* Low-stock alerts
* Stock updates
* Inventory history

### Orders

* Order listing
* Order details
* Order status
* Customer information

### Customers

* Customer listing
* Customer details
* Order history

### Reports

* Sales reports
* Inventory reports
* Product performance
* Revenue charts

## 🎨 Styling Guidelines

Use Tailwind CSS for styling wherever possible.

Example:

```jsx
<Card className="p-6">
  <h2 className="text-lg font-semibold">
    Total Sales
  </h2>
</Card>
```

Use the project's shared design tokens rather than hard-coding colors when possible:

```jsx
className="bg-background text-foreground"
```

Common tokens include:

```text
bg-background
bg-card
bg-primary
bg-secondary
text-foreground
text-muted-foreground
border-border
text-destructive
```

## 🔗 Import Alias

The project uses the `@` alias to reference the `src` directory.

Instead of:

```jsx
import { Button } from "../../../components/ui/button";
```

Use:

```jsx
import { Button } from "@/components/ui/button";
```

Utility functions can be imported using:

```jsx
import { cn } from "@/lib/utils";
```

## 🧪 Development Guidelines

Before creating a new component:

1. Check whether a shadcn/ui component already exists.
2. Reuse existing components whenever possible.
3. Keep reusable components inside `src/components`.
4. Keep page-specific logic inside the relevant page/module.
5. Avoid duplicating common UI logic.
6. Use Tailwind design tokens instead of unnecessary custom colors.
7. Keep components small and maintainable.

## 🌿 Git Workflow

Create a feature branch before starting new work:

```bash
git checkout -b feature/product-management
```

After making changes:

```bash
git status
git add .
git commit -m "Add product management UI"
```

Push the branch:

```bash
git push origin feature/product-management
```

Create a Pull Request after the feature is ready for review.

### Suggested Branches

```text
main
│
├── feature/dashboard
├── feature/product-management
├── feature/inventory
├── feature/orders
└── bugfix/...
```

## 🔐 Environment Variables

Environment-specific configuration should be stored in `.env` files.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Access environment variables in React/Vite:

```js
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

Do not commit sensitive credentials or secrets to Git.

Add environment files to `.gitignore`:

```text
.env
.env.local
.env.*.local
```

## 📌 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |

## 🛠️ Troubleshooting

### PowerShell blocks `npx`

If PowerShell shows:

```text
npx.ps1 cannot be loaded because running scripts is disabled
```

Run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then restart the terminal.

Alternatively, use Command Prompt.

### shadcn import alias error

If shadcn reports:

```text
Could not find valid path aliases or package imports for init.
```

Make sure `jsconfig.json` contains:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

And `vite.config.js` contains the `@` alias pointing to `src`.

## 📄 License

This project is currently maintained as a private/internal project.

---

**Lumiere Jewellery Admin**
Built with React + Vite + Tailwind CSS + shadcn/ui.

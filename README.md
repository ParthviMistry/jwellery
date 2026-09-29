# Lumiere Jewellery Admin

A modern, white-label admin platform for jewellery businesses built with React, Vite, Tailwind CSS, and shadcn/ui.

This project is designed as a reusable multi-client admin template. Shared screens and UI primitives stay consistent while each client can customize its branding, navigation, and business messaging without rewriting the base product.

## 🚀 Tech Stack

* React
* Vite
* JavaScript
* Tailwind CSS
* shadcn/ui
* Radix UI
* Lucide React
* React Router DOM
* Recharts
* clsx / tailwind-merge

## 🧠 Architecture

The app follows a layered architecture to keep it maintainable and reusable:

```text
config -> theme -> routes -> services/hooks -> page UI
```

Key layers:

* src/config/ — metadata, navigation, client theming, onboarding data
* src/context/ — client state and runtime theme switching
* src/lib/theme.js — theme application logic
* src/services/ — data access and business logic
* src/hooks/ — view-specific state and filtering logic
* src/pages/ — route-based screens
* src/components/ — reusable UI and layout building blocks

## 🏷️ White-label / multi-client model

Each client has a theme definition in [src/config/clientThemes.js](src/config/clientThemes.js). These definitions include:

* brand colors and accents
* sidebar and surface colors
* typography settings
* radius and shadow values
* brand labels and display names

The app reads the selected client at runtime through [src/context/ClientThemeContext.jsx](src/context/ClientThemeContext.jsx) and applies the values to CSS variables using [src/lib/theme.js](src/lib/theme.js). This allows the same UI shell to be reused across different brands.

## 🔄 Client onboarding workflow

New client onboarding should follow this flow:

1. Add a new theme profile to [src/config/clientThemes.js](src/config/clientThemes.js)
2. Update client metadata in [src/config/app.js](src/config/app.js)
3. Adjust any client-specific labels in [src/config/navigation.js](src/config/navigation.js)
4. Add client-specific copy and settings in the relevant pages
5. Validate the brand in the runtime selector and fix any token mismatches

A reusable checklist is available in [src/config/clientOnboarding.js](src/config/clientOnboarding.js).

## 📁 Project structure

```text
src/
├── components/
│   ├── layout/
│   └── ui/
├── config/
│   ├── app.js
│   ├── clientThemes.js
│   ├── clientOnboarding.js
│   └── navigation.js
├── context/
│   └── ClientThemeContext.jsx
├── data/
├── hooks/
├── lib/
│   ├── theme.js
│   └── utils.js
├── pages/
├── routes/
├── services/
├── App.jsx
├── index.css
├── main.jsx
└── something
```

## 🧩 Adding shadcn components

```bash
npx shadcn@latest add button card input select table dialog
```

## 📦 Install

```bash
npm install
```

## ▶️ Run locally

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## ✅ Phase 7 summary

This phase covers the final cleanup and client onboarding path:

* clearer architecture guidance
* easier multi-client branding workflow
* runtime theme selection support
* onboarding checklist for future clients
* documentation for how to extend the project without breaking the shared UI shell

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

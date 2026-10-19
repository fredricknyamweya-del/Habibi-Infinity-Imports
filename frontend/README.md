# Habibi Imports frontend

The storefront is a responsive React 18 and Vite 5 application for browsing imported goods and completing a mock-backed cart and checkout flow across Kenya and Tanzania.

## Setup

From this directory, install the dependencies and start the development server:

```sh
npm install
cp .env.example .env
npm run dev
```

The Vite development server runs on `http://localhost:5173`. API requests use `VITE_API_URL` and default to `/api`; the Vite development proxy forwards `/api` to `http://localhost:5000`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint JavaScript and JSX source |

## Environment

Copy `.env.example` to `.env` and set `VITE_API_URL` to the Flask API base URL. When the API is unavailable, catalog, category, order, payment, and ad services use local mock data so the storefront remains explorable.

## Folder structure

```text
src/
├── api/          Axios client and API service modules
├── app/          App routes, providers, and shared layouts
├── assets/       Static image and icon assets
├── components/   Shared UI, catalogue, layout, home, and ad components
├── config/       Brand, contact, locations, and category configuration
├── context/      Country, cart, and wishlist state
├── data/         Mock catalog and sponsored content
├── features/     Product, cart, checkout, and order feature components
├── pages/        Home, catalogue, product, cart, checkout, and order pages
├── styles/       Theme tokens and global styles
└── utils/        Currency formatting and shared constants
```

## Screenshots

Screenshots will be added after the storefront is reviewed in a browser.

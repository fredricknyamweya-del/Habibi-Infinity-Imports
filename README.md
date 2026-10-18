# Habibi Imports: Storefront

Luxury import and resale e-commerce storefront for East Africa, serving customers in **Kenya (KES)** and **Tanzania (TZS)**. Offices: Dar es Salaam and Nairobi.

---

## 1. Tech stack

### Frontend

| Layer | Technology | Declared version / details |
|---|---|---|
| Language | JavaScript (ES modules) and JSX | No TypeScript configuration or source files |
| UI | React and React DOM | `^18.3.1` |
| Build and dev server | Vite with `@vitejs/plugin-react` | `vite ^8.3.4`, plugin `^4.3.2` |
| Routing | React Router DOM | `^7.18.4` |
| HTTP client | Axios | `^1.7.7` |
| Styling | Bootstrap, React Bootstrap, Tailwind CSS, and project CSS | `bootstrap ^5.3.3`, `react-bootstrap ^2.10.5`, `tailwindcss ^4.3.3` |
| UI utilities | Framer Motion, React Icons, React Hot Toast, Swiper | Versions are declared in `frontend/package.json` |
| Package manager | npm | `frontend/package-lock.json` is present |

The JavaScript module format is ES modules (`"type": "module"` in
`frontend/package.json`). The project does not currently pin a Node.js version.
The Vite configuration and JavaScript configuration files are present but empty,
so aliases and CSS tooling are not configured there yet.

### Backend status

The backend source tree is named with JavaScript `.js` files, but its dependency
manifests (`backend/Pipfile` and `backend/Pipfile.lock`) declare Python 3.12 and
Flask. There is no `backend/package.json` at present. The backend runtime is
therefore not consistently defined; choose either a JavaScript/Node.js backend
or a Python/Flask backend before implementing or running it.

### Frontend scripts

Run these commands from `frontend/`:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

These are the scripts declared in `frontend/package.json`. No formatter script
is currently configured.

---

## 2. Project structure (current scaffold)

```
.
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── Pipfile
│   ├── Pipfile.lock
│   ├── docs/
│   │   ├── openapi.yaml
│   │   └── payments.md
│   ├── migrations/
│   │   └── .gitkeep
│   ├── seed/
│   │   ├── categories.js
│   │   ├── index.js
│   │   ├── products.js
│   │   └── regions.js
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── jobs/
│   │   ├── lib/
│   │   ├── middleware/
│   │   └── modules/
│   │       ├── admin/
│   │       ├── ads/
│   │       ├── auth/
│   │       ├── cart/
│   │       ├── categories/
│   │       ├── checkout/
│   │       ├── contact/
│   │       ├── home/
│   │       ├── newsletter/
│   │       ├── orders/
│   │       ├── payments/
│   │       │   └── providers/
│   │       ├── products/
│   │       ├── users/
│   │       ├── webhooks/
│   │       └── wishlist/
│   └── tests/
│       ├── fixtures/.gitkeep
│       ├── integration/.gitkeep
│       └── unit/.gitkeep
└── frontend/
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── jsconfig.json
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/
    │   └── favicon.svg
    ├── tests/
    │   ├── e2e/.gitkeep
    │   └── unit/.gitkeep
    └── src/
        ├── main.jsx
        ├── api/
        ├── app/
        │   └── layouts/
        ├── assets/
        │   ├── icons/.gitkeep
        │   └── images/.gitkeep
        ├── components/
        │   ├── ads/
        │   ├── catalog/
        │   ├── home/
        │   ├── layout/
        │   └── ui/
        ├── features/
        │   ├── admin/
        │   ├── auth/
        │   ├── cart/
        │   ├── checkout/
        │   ├── orders/
        │   └── product/
        ├── pages/
        ├── hooks/
        ├── lib/
        ├── store/
        └── styles/
```

The application source files and the Vite/JavaScript configuration files are
currently empty scaffolding. The package manifests declare dependencies, but
the structure does not yet represent a runnable storefront or API.

### Frontend source organization

```
src/
├── app/                    # app entry, router, providers, layouts
├── api/                    # JavaScript client and per-resource modules
├── components/
│   ├── ui/                 # Button, Input, Select, Stepper, Badge, Toast, StatusChip, Skeleton
│   ├── catalog/            # ProductCard, CategoryRow, CategoryCard, FilterSidebar
│   ├── layout/             # Navbar, MegaMenu, CartDrawer, Footer
│   └── ads/                # AdSlot, SponsoredCard
├── features/               # cart, checkout, auth, wishlist, orders, admin
├── hooks/                  # useCountry, useCart, useDebounce
├── pages/                  # Home, Catalogue, Product, Cart, Checkout, Confirmation, Admin
├── lib/                    # money.js, format.js, analytics.js
└── styles/tokens.css
```

---

## 3. Implementation status

The frontend and backend source trees currently contain empty scaffold files.
The dependencies and folder layout establish an intended React storefront, but
no UI, API, or backend behavior has been implemented yet. The feature lists,
design notes, and API contract below describe the planned product rather than
features that are already working.

### Planned features not implemented

| Area | Gap |
|---|---|
| Routing | Implement `/`, `/shop`, `/shop/:category`, `/p/:slug`, `/cart`, `/checkout`, `/order/:number`, and `/admin/*` |
| Catalogue | Build category browsing, filters, sorting, and pagination |
| Product detail | Build image gallery, variants, quantity control, delivery estimate, tabs, and related products |
| Cart | Implement cart lines, quantity updates, persistence, promo codes, and shipping estimates |
| Checkout | Implement shipping, delivery methods, payment, and order review |
| Confirmation | Add order confirmation and tracking |
| Admin | Add product, order, and ad management |
| Ads | Implement leaderboard and in-grid placements, plus impression and click tracking |
| Shared UI | Implement reusable form controls, feedback, loading, and status components |
| Search and wishlist | Connect search and wishlist behavior to application state and the API |
| Integrations | Connect newsletter, WhatsApp, and social links |

### Implementation requirements

1. **Theme behavior is undecided.** Choose whether the storefront should support a light theme or dark mode only before implementing styles.
2. **Use country-specific prices.** Prices must come from the API per country (section 6.1); do not derive one currency from the other on the client.
3. **Represent money consistently.** Use integer minor units and ISO currency codes in the API (section 5.2).
4. **Use structured ratings.** Represent ratings numerically and include a review count.
5. **Use stable product identifiers.** Use product IDs or SKUs rather than product names as identity.
6. **Use owned product imagery.** Serve approved assets from a controlled CDN.
7. **Keep content current.** Avoid hard-coded copyright years in the footer.
8. **Align badges with the API.** Use the agreed badge set (section 5.3).
9. **Confirm contact details.** Verify the Kenya and Tanzania phone numbers before launch.
10. **Use semantic navigation.** Use links or router links for navigation, not buttons.

---

## 4. Design system

The planned design tokens should live as CSS variables in `src/styles/tokens.css`:

| Token | Value | Use |
|---|---|---|
| `--obsidian` | `#0B0B0D` | Page background |
| `--charcoal` | `#16161A` | Cards |
| `--charcoal-light` | `#1D1D22` | Raised surfaces |
| `--gold` | `#D4B978` | Accents, numerals, CTAs |
| `--soft-gold` | `#F1E3BC` | Hover |
| `--ivory` | `#F7F3EA` | Primary text |
| `--muted` | `#A0A0A6` | Secondary text |
| `--line` | `rgba(212,185,120,.18)` | Gold 1px borders |
| `--faint-line` | `rgba(255,255,255,.09)` | Dividers |

Rules: Playfair Display for headings and numerals, Inter for body; 12px card radius; 1px gold borders; subtle gold glow on hover; 8px spacing scale; 12-column grid at 1440px (max content width 1440px, section padding `5.5vw`). Target viewports: **1440px desktop** and **390px mobile**.

If using Tailwind utilities, expose the tokens through `@theme` in `src/styles/tokens.css` (for example `--color-gold`, `--font-display`) so classes like `bg-obsidian text-ivory border-gold/20` work.

---

## 5. API contract

The storefront needs a working backend API. The contract below is a **proposal**
for the backend team to confirm, based on the storefront requirements.

### 5.1 Conventions

- **Base URL:** `https://api.habibiimports.com/v1` (configure via `VITE_API_BASE_URL`)
- **Format:** JSON, UTF-8. Dates in ISO 8601 UTC (`2026-10-17T09:30:00Z`).
- **Country context:** every catalogue/cart/checkout request carries `X-Country: KE | TZ` (or `?country=`). The server returns prices in that country's currency. Default is inferred from IP, then overridden by the user's switcher choice (persist in `localStorage["habibi-country"]`).
- **Auth:** Bearer JWT for customers/admin (`Authorization: Bearer <token>`). Guests are supported through a `cart_token` cookie (HttpOnly) and guest checkout.
- **Idempotency:** `POST /orders` and `POST /payments/*` require an `Idempotency-Key` header.
- **Pagination:** `?page=1&per_page=24`. Responses include `meta: { page, per_page, total, total_pages }`.
- **Errors** (all non-2xx):

```json
{
  "error": {
    "code": "OUT_OF_STOCK",
    "message": "Only 2 units left for this variant.",
    "field": "items[0].quantity",
    "details": {}
  }
}
```

Common codes: `VALIDATION_ERROR` (422), `UNAUTHORIZED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `OUT_OF_STOCK` (409), `PRICE_CHANGED` (409), `PROMO_INVALID` (422), `PAYMENT_FAILED` (402), `RATE_LIMITED` (429).

### 5.2 Money

Never send floats. Money is an object in **minor units** with an ISO currency:

```json
{ "amount": 18500000, "currency": "TZS" }
```

> KES and TZS both display without decimals in the UI, but the API should still use minor units (KES uses 100 cents). Define and document the multiplier per currency, and apply it in one place (`lib/money.js`).

Each product stores **independent prices per country** (see `prices` below). Exchange-rate derivation belongs to the backend or to merchandising, not the client.

### 5.3 Core types

```ts
type Country = "KE" | "TZ";
type Currency = "KES" | "TZS";
type Money = { amount: number; currency: Currency };

type Badge = "NEW" | "SALE" | "SPONSORED" | "BESTSELLER" | "LIMITED"; // confirm final set

interface Category {
  id: string;
  slug: string;               // "fashion-apparel"
  position: number;           // 1..7, rendered as "01".."07"
  title: string;              // "Fashion & Apparel"
  image_url: string;
  subcategories: { id: string; slug: string; title: string }[];
}

interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand?: string;
  category: { id: string; slug: string; title: string };
  subcategory?: { id: string; slug: string; title: string };
  images: { url: string; alt: string }[];
  price: Money;               // in the requested country's currency
  compare_at_price?: Money;   // present when on sale
  badges: Badge[];
  rating: { average: number; count: number };
  stock_status: "in_stock" | "low_stock" | "out_of_stock";
  stock_quantity?: number;    // only when low_stock
  available_in: Country[];
  variants?: ProductVariant[];
  created_at: string;
}

interface ProductVariant {
  id: string;
  sku: string;
  options: { size?: string; color?: string };
  stock_status: Product["stock_status"];
  price?: Money;              // override, if different
}

interface ProductDetail extends Product {
  description_html: string;
  specifications: { label: string; value: string }[];
  delivery_estimates: DeliveryEstimate[];
  authenticity: { genuine: true; origin_country?: string };
}

interface DeliveryEstimate {
  country: Country;
  method: "standard" | "express" | "pickup";
  min_days: number;
  max_days: number;
  fee: Money;
}

interface CartItem {
  id: string;                 // line id
  product_id: string;
  variant_id?: string;
  name: string;
  image_url: string;
  options?: { size?: string; color?: string };
  quantity: number;
  unit_price: Money;
  line_total: Money;
  stock_status: Product["stock_status"];
}

interface Cart {
  id: string;
  country: Country;
  items: CartItem[];
  subtotal: Money;
  discount?: { code: string; amount: Money };
  shipping_estimate?: Money;
  total: Money;
  free_shipping_threshold: Money;   // KES 15,000 / TZS 250,000 per announcement bar
}
```

### 5.4 Endpoints

#### Catalogue

| Method | Path | Purpose |
|---|---|---|
| GET | `/categories` | Full tree of the 7 categories with subcategories (menu, cards, sidebar) |
| GET | `/products` | Catalogue listing |
| GET | `/products/{slug}` | Product detail |
| GET | `/products/{id}/related` | Related products |
| GET | `/search/suggest?q=` | Typeahead (name, category) for the navbar search |
| GET | `/home` | Aggregated home payload (below) |

`GET /products` query parameters:

| Param | Example | Notes |
|---|---|---|
| `category` | `bags-handbags` | Category slug |
| `subcategory` | `backpacks` | Subcategory slug |
| `q` | `oud` | Full-text |
| `min_price`, `max_price` | `5000`, `50000` | In the request country's currency, major units |
| `available_in` | `KE,TZ` | Country availability filter |
| `rating_min` | `4` | |
| `badge` | `new`, `sale` | |
| `in_stock` | `true` | |
| `sort` | `popular`, `newest`, `price_asc`, `price_desc`, `rating` | |
| `page`, `per_page` | `1`, `24` | |

Response:

```json
{
  "data": [ /* Product[] */ ],
  "facets": {
    "price": { "min": 3500, "max": 890000 },
    "ratings": { "4": 112, "3": 140 },
    "countries": { "KE": 220, "TZ": 198 },
    "categories": [{ "slug": "footwear", "count": 36 }]
  },
  "meta": { "page": 1, "per_page": 24, "total": 220, "total_pages": 10 }
}
```

`GET /home` response (one round trip for the landing page):

```json
{
  "hero_slides": [ { "product": { /* Product */ }, "label": "NEW COLLECTION" } ],
  "popular": [ /* Product[4] */ ],
  "new_arrivals": [ /* Product[] */ ],
  "featured_deals": [ /* Product[] */ ],
  "ads": {
    "leaderboard": { /* AdCreative or null */ },
    "grid_promo":  { /* AdCreative or null */ }
  },
  "announcement": { "text": "Complimentary delivery on orders over ...", "active": true }
}
```

#### Cart

Guests use the `cart_token` cookie. After sign-in, the guest cart is merged into the user's cart.

| Method | Path | Body | Purpose |
|---|---|---|---|
| GET | `/cart` | | Current cart |
| POST | `/cart/items` | `{ product_id, variant_id?, quantity }` | Add. Increments quantity if the line already exists |
| PATCH | `/cart/items/{lineId}` | `{ quantity }` | Update quantity (0 removes) |
| DELETE | `/cart/items/{lineId}` | | Remove line |
| POST | `/cart/promo` | `{ code }` | Apply promo |
| DELETE | `/cart/promo` | | Remove promo |
| GET | `/cart/shipping-estimate?region=` | | Estimate before checkout |

Replaces the prototype behaviour where each "Add" appends a duplicate entry with `Qty: 1`.

#### Wishlist (authenticated)

| Method | Path | Purpose |
|---|---|---|
| GET | `/wishlist` | List |
| PUT | `/wishlist/{productId}` | Add (idempotent) |
| DELETE | `/wishlist/{productId}` | Remove |

#### Auth and customer

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register` | `{ name, phone, email?, password }` |
| POST | `/auth/login` | `{ identifier, password }` (phone or email) |
| POST | `/auth/otp/request` | `{ phone }`: SMS OTP, common in this market |
| POST | `/auth/otp/verify` | `{ phone, code }` |
| POST | `/auth/refresh` | |
| POST | `/auth/logout` | |
| GET / PATCH | `/me` | Profile |
| GET / POST / DELETE | `/me/addresses` | Saved addresses |

#### Checkout and orders

| Method | Path | Purpose |
|---|---|---|
| GET | `/checkout/regions?country=KE` | Counties (KE) or regions (TZ) for the dropdown |
| POST | `/checkout/delivery-options` | Available methods and fees for an address and cart |
| POST | `/orders` | Create the order (guest or authenticated) |
| GET | `/orders/{orderNumber}` | Confirmation page (requires order token or auth) |
| GET | `/orders/{orderNumber}/tracking` | Tracking events |
| GET | `/me/orders` | Order history |
| POST | `/orders/{orderNumber}/return-requests` | Easy returns (the brief and trust strip promise a 7-day policy) |

`POST /orders` request:

```json
{
  "contact": { "name": "Amina Juma", "phone": "+255749057058", "email": "amina@example.com" },
  "shipping_address": {
    "country": "TZ",
    "region": "Dar es Salaam",
    "town": "Masaki",
    "address_line": "Plot 12, Haile Selassie Rd",
    "notes": ""
  },
  "delivery_method": "express",
  "payment_method": "mpesa",
  "promo_code": "WELCOME10"
}
```

Response `201`:

```json
{
  "order_number": "HB-20261017-00482",
  "status": "pending",
  "payment_status": "awaiting_payment",
  "items": [ /* CartItem[] */ ],
  "totals": {
    "subtotal": { "amount": 0, "currency": "TZS" },
    "shipping": { "amount": 0, "currency": "TZS" },
    "discount": { "amount": 0, "currency": "TZS" },
    "total":    { "amount": 0, "currency": "TZS" }
  },
  "payment": { "method": "mpesa", "next_action": "stk_push_sent" },
  "tracking_url": "/order/HB-20261017-00482",
  "access_token": "..."
}
```

Order `status` enum: `pending | confirmed | shipped | delivered | cancelled | returned` (the UI chips need at least Pending, Shipped, Delivered). Server validates stock and recomputes prices; it returns `PRICE_CHANGED` or `OUT_OF_STOCK` rather than trusting the client.

Phone validation: Kenya `+254 7XX / 1XX XXX XXX`, Tanzania `+255 [67]XX XXX XXX`.

#### Payments

| Method | Path | Purpose |
|---|---|---|
| POST | `/payments/mpesa/stk-push` | Trigger the STK push `{ order_number, phone }` |
| GET | `/payments/{paymentId}` | Poll status (`pending`, `paid`, `failed`, `cancelled`) |
| POST | `/payments/card/intent` | Create a card payment session (provider-hosted fields, redirect or 3DS) |
| POST | `/webhooks/mpesa` | Provider callback (server-to-server only, signature or IP verified) |
| POST | `/webhooks/card` | Card provider callback |

M-Pesa flow:

1. Client creates the order (`payment_method: "mpesa"`).
2. Server sends the STK push. The customer enters their PIN on their handset.
3. Client polls `GET /payments/{id}` every 3s for up to ~90s (or listens on SSE/WebSocket).
4. The provider webhook marks the payment `paid`, the order moves to `confirmed`, and the UI routes to `/order/{orderNumber}`.
5. On timeout or failure the UI offers retry, a different number, or switching to card or cash on delivery.

Provider notes (to be confirmed by the business): Kenya typically uses Safaricom Daraja (Lipa Na M-Pesa Online). Tanzania M-Pesa runs through Vodacom Tanzania's own API, and a payment aggregator may be preferable if one integration is wanted for both. Card processing needs a provider that supports KES and TZS settlement. Cash on delivery creates the order immediately with `payment_status: "cod"`.

#### Ads ("Sponsored")

| Method | Path | Purpose |
|---|---|---|
| GET | `/ads?placement=leaderboard&country=KE` | Serve an ad for a placement |
| POST | `/ads/{id}/impression` | Beacon when viewed |
| POST | `/ads/{id}/click` | Beacon, then redirect or return `target_url` |

```ts
interface AdCreative {
  id: string;
  placement: "leaderboard" | "grid_promo" | "product_sidebar" | "catalogue_inline";
  format: "image" | "promo_card";
  width?: 728; height?: 90;           // leaderboard
  image_url?: string;
  eyebrow?: string; headline?: string; body?: string; cta_label?: string;
  target_url: string;
  sponsor: string;
  countries: Country[];
  label: "Sponsored";                  // always displayed
}
```

Ads must always render the visible "Sponsored" label. Reserve slot dimensions in CSS so they do not cause layout shift, and render nothing (no empty box) when no creative is returned.

#### Newsletter and contact

| Method | Path | Purpose |
|---|---|---|
| POST | `/newsletter` | `{ email }` for the Join the list form |
| POST | `/contact` | `{ name, phone, message }` |

#### Admin (role `admin` or `staff`)

All under `/admin`, requiring a Bearer token with the matching role.

| Method | Path | Purpose |
|---|---|---|
| GET / POST | `/admin/products` | List (search, filters) and create |
| GET / PATCH / DELETE | `/admin/products/{id}` | Read, update, archive |
| POST | `/admin/products/{id}/images` | Upload (multipart) |
| PATCH | `/admin/products/{id}/stock` | `{ variant_id?, quantity }` |
| GET | `/admin/orders` | Filter by `status`, `country`, `date` |
| GET / PATCH | `/admin/orders/{orderNumber}` | Detail and status transition `{ status, tracking_number?, carrier? }` |
| GET / POST / PATCH / DELETE | `/admin/ads` | Ad placement manager (creative, placement, countries, schedule, active) |
| GET | `/admin/ads/{id}/stats` | Impressions, clicks, CTR |
| GET / POST | `/admin/promo-codes` | Promo management |

Product create body (prices per country):

```json
{
  "sku": "HB-BAG-0001",
  "name": "Noir Structured Handbag",
  "category_id": "cat_02",
  "subcategory_id": "sub_handbags",
  "prices": {
    "KE": { "amount": 1088000, "currency": "KES" },
    "TZ": { "amount": 18500000, "currency": "TZS" }
  },
  "available_in": ["KE", "TZ"],
  "badges": ["NEW"],
  "variants": [],
  "stock_quantity": 12
}
```

---

## 6. Frontend requirements by screen

### 6.1 Global

- **Country switcher** must drive the `X-Country` header and refetch prices. Replace the hard-coded `/17` conversion. Persist the choice.
- **JavaScript API client** in `src/api/` (HTTP client, error normalisation, auth refresh). Use a data-fetching library (TanStack Query recommended) for caching and skeleton states.
- **Cart state** is server-backed (`/cart`). Optimistic updates for quantity changes.
- **Routing** with a router that supports lazy loading and scroll restoration.
- **Toast** system (replace the single `toast` string state with a queue).
- **Skeleton** shimmer variants for product card, category card, hero and cart row (dark shimmer).
- **Accessibility:** focus trap and `Esc` to close drawers, `aria-expanded` on accordion rows (rows are currently one big `<button>`), alt text from the API, visible focus ring (already gold), reduced-motion support for the hero.

### 6.2 Home
Wire to `GET /home`. Add the missing 728x90 leaderboard and in-grid promo card, a Featured Deals row, and fix the `#deals` anchor.

### 6.3 Catalogue
Sidebar with the numbered accordion (reuse `CategoryList` with links to `?category=&subcategory=`), price range, country availability, rating, sort dropdown, grid, pagination. Filters live in the URL query string so pages are shareable.

### 6.4 Product detail
Gallery, price and stock state, size/colour variants (disable out-of-stock combinations), quantity stepper (min 1, max = stock), Add to Cart, delivery estimate for the selected country, tabs (Description, Specifications, Delivery & Returns), related products, sponsored slot. Out-of-stock replaces Add to Cart with a disabled button and a "Notify me / WhatsApp" option.

### 6.5 Cart (drawer and page)
Quantity stepper, remove, promo code input with error state, subtotal / shipping estimate / total, free-shipping progress against the threshold, empty state (exists in the drawer), "Proceed to Checkout".

### 6.6 Checkout
Three steps with a gold progress bar:

1. **Shipping:** name, phone, country (KE/TZ), region/county, town, address.
2. **Delivery method:** Standard, Express, Pickup (fees/ETAs from `/checkout/delivery-options`).
3. **Payment:** M-Pesa, card, cash on delivery. Then **Review and Place Order**.

Validate client-side and mirror the server rules. Keep form state in the URL or session so a refresh does not wipe it. Disable "Place order" while the request is in flight and send an `Idempotency-Key`.

### 6.7 Confirmation
Gold check, order number, summary, tracking link (`/order/:number`), payment status with polling for M-Pesa.

### 6.8 Admin (optional)
Products table, orders with status chips (Pending, Shipped, Delivered), ad placement manager. Gate by role and lazy-load the admin bundle.

---

## 7. Component inventory

| Component | Exists | Needed variants |
|---|---|---|
| Button | partial (`.btn-primary`, `.btn-ghost`) | disabled, loading, sizes |
| ProductCard | yes | out of stock, Sale price, skeleton |
| CategoryRow (accordion) | yes | expandable subcategory links, sidebar variant |
| CategoryCard | yes | skeleton |
| Input / Select / Dropdown | no | error, disabled |
| Quantity stepper | no | |
| Badge | yes (generic) | Sale, New, Sponsored |
| Toast | yes (single) | queue, error variant |
| Status chip | no | Pending, Shipped, Delivered (plus Cancelled) |
| Ad banner | partial | 728x90 leaderboard, promo card |
| Skeleton | no | card, row, hero |
| Drawer | yes (menu and cart) | shared primitive with focus trap |

---

## 8. Environment variables

```bash
VITE_API_BASE_URL=https://api.habibiimports.com/v1
VITE_DEFAULT_COUNTRY=KE
VITE_WHATSAPP_NUMBER_KE=+254...      # confirm
VITE_WHATSAPP_NUMBER_TZ=+255...      # confirm
VITE_GA_ID=                          # optional analytics
VITE_CARD_PUBLIC_KEY=                # card provider publishable key
```

Secrets (M-Pesa consumer keys, passkey, card secret keys, webhook secrets) belong to the backend only, never in `VITE_*` variables.

---

## 9. Non-functional requirements

- **Performance:** lazy-load below-the-fold images, serve responsive `srcset` images through a CDN, preconnect to the font host (or self-host fonts), LCP image for the hero preloaded. Mobile networks in the region are variable, so keep the JS budget tight and route-split.
- **Security:** HTTPS only; HttpOnly, Secure, SameSite cookies for `cart_token`; verify webhook signatures; rate-limit auth, promo and payment endpoints; sanitise `description_html` server-side.
- **SEO:** the app is a client-rendered SPA. Product and category pages benefit from SSR or pre-rendering. Also provide per-route titles and meta, `Product` JSON-LD, and a sitemap. (`site.json` currently sets `robots.index = false`; flip this for launch.)
- **Privacy:** privacy policy and terms pages (footer links exist but go nowhere), consent for the newsletter, and handling of phone numbers per Kenya's Data Protection Act and Tanzania's Personal Data Protection Act.
- **Analytics events:** `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `ad_impression`, `ad_click`.
- **Testing:** unit tests for money/format helpers, component tests for cart and checkout, E2E for the guest M-Pesa purchase path.

---

## 10. Suggested delivery order

1. Implement the JavaScript React app entry, shared layouts, router, and design tokens.
2. Add a JavaScript API client, `GET /categories`, `GET /home`, and country context.
3. Catalogue and product detail.
4. Server-backed cart (drawer and page), promo codes.
5. Checkout and M-Pesa STK flow (Kenya first, then Tanzania), confirmation and tracking.
6. Ads (serving, impression/click beacons).
7. Admin.
8. Hardening: accessibility pass, performance, SEO, analytics.

---

## 11. Open questions for the business

- Final badge set and whether the light theme stays.
- Payment providers for Kenya and Tanzania, and whether card payments are in scope at launch.
- Per-country pricing source (manual per product or rate-driven).
- Delivery zones, fees, and the Pickup locations in Dar es Salaam and Nairobi.
- Return policy terms behind "Easy returns" (the UI says 7 days).
- WhatsApp numbers and social account URLs.
- Who owns ad sales and whether third-party ad networks are used or only direct sponsors.

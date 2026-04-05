# Moroccan Artisan Marketplace Architecture Plan

This document outlines the frontend system design and architecture for the multi-role Moroccan artisan marketplace. It is designed to be highly scalable, providing clear separation of concerns, robust security, and a beautiful, culturally rich user experience.

## 1. Folder Structure
The application follows a modular, feature-based architecture. This ensures that as the platform grows, domain logic remains tightly coupled to its feature while remaining decoupled from global configurations.

```text
src/
├── assets/
│   ├── images/
│   ├── fonts/
│   └── patterns/             # Moroccan geometric vectors (SVG) for backgrounds
├── components/
│   ├── common/               # Reusable atomic UI (Buttons, Inputs, Cards, Modals)
│   ├── layout/               # Header, Footer, Sidebar, RootLayout
│   ├── theme/                # ThemeProvider, RTLProvider
│   ├── store/                # Customer-facing elements (ProductCard, CartDrawer)
│   ├── vendor/               # Artisan dashboard elements
│   └── admin/                # Admin tables, moderation components
├── config/
│   ├── supabase.ts           # Supabase client instantiation
│   └── constants.ts          # App-wide constants
├── features/                 # Modularized business logic
│   ├── auth/                 # Login/Register, Session management
│   ├── cart/                 # Cart logic & state handling
│   ├── checkout/             # Payment integrations (Stripe)
│   ├── products/             # Product fetching, filtering pipelines
│   └── vendors/              # Artisan profiles and store management
├── hooks/
│   ├── useAuth.ts            # Authentication state hook
│   ├── useRole.ts            # RBAC helper hook
│   └── useRTL.ts             # Detects and applies text-direction
├── i18n/
│   ├── en.json
│   ├── fr.json
│   └── ar.json               # Arabic translations (RTL support)
├── lib/                      # Clean wrappers for 3rd party SDKs
│   ├── utils.ts              # Tailwind clsx/tailwind-merge utilities
│   └── payments.ts           # Stripe abstraction layer
├── pages/                    # Route-level components mapping
│   ├── auth/
│   ├── customer/
│   ├── vendor/
│   └── admin/
├── routes/
│   ├── AppRouter.tsx         # Central route definitions
│   ├── ProtectedRoute.tsx    # Auth verification wrapper
│   └── RoleRoute.tsx         # Role gating wrapper
├── services/                 # API/Supabase communication layer
├── store/                    # Global state definitions (Zustand)
├── types/                    # TypeScript interfaces / DB schemas
└── index.css                 # Tailwind directives + CSS variables
```

## 2. Key Components List

### UI Design System (`components/common`)
- **`Button`**: Supports primary (Zellige blue), secondary (Terracotta), and ghost variants.
- **`Card`**: Custom rounded-top variations (`rounded-t-[3rem]`) to mimic Moroccan architectural arches.
- **`OrnamentalDivider`**: SVG pattern divider for visual structure.

### Contextual Components
- **Customer Shopping (`features/products`)**:
  - `ProductGrid` / `ProductCard`: High-fidelity image gallery, artisan attribution.
  - `ProductFilters`: Complex state component for price, category, and artisan routing.
  - `CartDrawer`: Slide-out component for quick cart access.
- **Vendor Dashboard (`features/vendors`)**:
  - `ProductForm`: Multi-step form with image uploads for artisanal goods.
  - `SalesChart`: Minimalist overview of shop performance.
  - `OrderListRoster`: Status-driven table for order fulfillment.
- **Admin Panel`:
  - `ApprovalQueue`: Moderation feed for new vendors and products.
  - `UserManagementTable`: Overview of active, suspended, and pending accounts.

## 3. Routing Architecture
Implemented via **React Router DOM v6** (using the `createBrowserRouter` object API).

- **Public Space**
  - `/` (Home)
  - `/shop` (Product Listing)
  - `/shop/:id` (Product Detail)
  - `/artisan/:username` (Vendor Public Storefront)
  - `/auth/login`, `/auth/register`
- **Customer Space (Wrapped in `<ProtectedRoute>`)**
  - `/checkout` (Stripe flow)
  - `/account/orders`
  - `/account/profile`
- **Vendor Space (Wrapped in `<RoleRoute allowed={["vendor", "admin"]}>`)**
  - `/dashboard` (Sales overview)
  - `/dashboard/products` (Catalog management)
  - `/dashboard/orders` (Order fulfillment)
- **Admin Space (Wrapped in `<RoleRoute allowed={["admin"]}>`)**
  - `/admin` (Platform metrics)
  - `/admin/approvals` (Moderation)

## 4. State Management Approach

1. **Global UI State (Zustand)**
   - Used for lightweight, non-persistent, or local-storage states that shouldn't require complex providers.
   - Example: Cart contents, Sidebar toggle state, Active language preference.
2. **Server State & API (TanStack Query / React Query)**
   - Handles all asynchronous communication with Supabase.
   - Provides out-of-the-box caching, pagination, infinite scrolling (for product feeds), and background refetching.
3. **Form State (React Hook Form + Zod)**
   - Manages complex forms (Vendor Product Upload, Checkout) seamlessly.
   - Zod handles typescript-aligned validation before any data touches the backend.
4. **Auth State (Context / Supabase Auth)**
   - Exposes a `useAuth()` hook for components to subscribe to session changes actively.

## 5. Role-Based Access Design

- **Identity Layer**: Supabase Auth maps users to their IDs.
- **Role Layer**: A `user_roles` table (or `app_metadata` in JWTs) defines `customer`, `vendor`, or `admin`.
- **Frontend Gating**: `<RoleRoute>` prevents unauthorized component mounting, throwing users to a 403 or redirecting them seamlessly. Note: The frontend gating is purely for UX.
- **Backend Security (CRITICAL)**: Supabase Row Level Security (RLS) is the actual security barrier.
  - *Customers*: Can read `status = 'approved'` products.
  - *Vendors*: Can read/write their own products and orders.
  - *Admins*: Bypass all RLS restrictions for moderation.

## 6. Theme System Breakdown (Moroccan Identity)

The visual identity is highly driven by the Tailwind config.

### Colors
Defined in `tailwind.config.js`:
```js
colors: {
  zellige: { 100: '#E6F0FA', 500: '#1E6091', 900: '#0C2A4A' }, // Deep vibrant blues
  terracotta: { 100: '#FAE8E1', 500: '#C25934', 900: '#662711' }, // Earthy clay reds
  desert: '#F4E3D7',                                              // Background sand tone
  olive: '#556B2F',                                               // Accents
}
```

### Typography
- **Headings (`font-serif`)**: Elegant serif (e.g., *Playfair Display* or *Lora*) to establish an editorial feel.
- **Body (`font-sans`)**: Clean, readable sans-serif (e.g., *Inter*).
- **Arabic (`font-arabic`)**: *Cairo* or *Tajawal* for pristine right-to-left typographic beauty.

### UI Accents
- Extensive use of rounded arch primitives (`rounded-t-3xl`).
- Micro-interactions: Cards subtly elevate (shadow change) and shift top borders on hover.
- Backgrounds utilize faint, 5-opacity SVG repeating geometric patterns.

### Localization (RTL)
- Built with standard Tailwind logical properties (`ms-4` instead of `ml-4`, `start`, `end`).
- Arabic triggers an `<html dir="rtl">` shift, seamlessly flipping structural Flexbox and Grid layouts.

## 7. Data Flow Overview (Example: Ordering a Rug)

1. **Query**: Client visits `/shop`. TanStack Query hits Supabase to fetch products (`status=approved`). Data is cached globally in the browser.
2. **State Mutation**: Client clicks "Add to Cart". Zustand updates its internal cart array and syncs with `localStorage`.
3. **Checkout Transition**: Client routes to `/checkout`. React Hook Form takes control to validate shipping addresses.
4. **Third-Party API**: The abstraction layer `payments.ts` communicates securely with Stripe to finalize the transaction.
5. **Database Mutation**: Upon Stripe success, a Supabase RPC or Insert creates an `Order` attached to the vendor.
6. **Real-time Synchronization**: The artisan, currently logged into the Vendor Dashboard (`/dashboard/orders`), receives a Supabase Realtime broadcast. Their TanStack Query cache invalidates and updates immediately to show the new incoming order.

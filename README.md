# Next.js Full Client-Side Template

## Architecture & Design Document

---

## 1. Purpose

This repository is a **Next.js client-only application template**.

It is designed for:

- Admin dashboards
- SaaS frontends
- Internal tools

The template:

- Uses static export only
- Has no backend dependency
- Uses mocked or artificial APIs
- Prioritizes type safety and maintainability

---

## 2. Core Architecture Rules (Non‑Negotiable)

1. **Feature owns everything related to it**
   - hooks
   - guards
   - services
   - schemas
   - permissions
   - events
   - UI

2. **Global code must be feature-agnostic**
   - no business meaning
   - no domain assumptions

3. **Features must be removable**
   - deleting a feature must not break others

4. **Infrastructure ≠ Features**
   - infrastructure enables features
   - features never enable infrastructure

---

## 3. Rendering Model

- Client-side only
- Static export (`output: "export"`)
- No API routes
- No server actions
- No SSR

Localized routes are mandatory.

---

## 4. Tech Stack

- Next.js (App Router)
- TypeScript (strict)
- TanStack Query
- Zod
- shadcn/ui
- Tailwind CSS
- MSW (mock backend)

---

## 5. Folder Ownership Model

### Top-Level Categories

```text
src/
├── app/          # routing only
├── features/     # business logic
├── components/   # generic UI only
├── lib/          # infrastructure
├── schemas/      # cross-feature schemas
├── services/     # cross-feature singletons
├── styles/       # global styles
├── types/        # cross-feature types
```

---

## 6. Feature Folder Contract

Every feature follows the same structure.

```text
features/<feature-name>/
├── components/
├── hooks/
├── guards/
├── services/
├── schemas.ts
├── types.ts
├── permissions.ts
├── events.ts
├── index.ts
```

### Rules

- No feature imports another feature directly
- Shared logic must move to `lib/` or `components/`
- Guards never live globally unless project-wide

---

## 7. Example: Auth Feature

```text
features/auth/
├── components/
│   ├── login-form.tsx
│   └── logout-button.tsx
│
├── hooks/
│   ├── use-auth.ts
│   ├── use-login.ts
│   └── use-logout.ts
│
├── guards/
│   ├── auth-guard.tsx
│   └── guest-guard.tsx
│
├── services/
│   └── auth-service.ts
│
├── schemas.ts
├── types.ts
├── permissions.ts
├── events.ts
└── index.ts
```

Auth does not leak outside its feature boundary.

---

## 8. Admin Feature (Sub‑Features)

Admin is a **container feature**.

```text
features/admin/
├── users/
├── roles/
├── permissions/
├── audit-log/
├── guards/
│   └── admin-guard.tsx
└── index.ts
```

Each admin sub-feature follows the same feature contract.

---

## 9. Guards

### Ownership Rules

- Feature guards live in the feature
- Project-wide guards live in `lib/guards`

Examples:

- `AuthGuard` → auth feature
- `PermissionGuard` → admin feature
- `LocaleGuard` → i18n feature

---

## 10. Hooks

### Ownership Rules

- Hooks live where their behavior belongs
- No generic “hooks” dumping ground

Only allowed global hooks:

- event subscriptions
- browser primitives

---

## 11. Infrastructure (`lib/`)

Infrastructure is **business-agnostic**.

```text
lib/
├── api/
│   ├── client.ts
│   └── mock-adapter.ts
│
├── events/
│   ├── event-bus.ts
│   ├── broadcast.ts
│   └── use-event.ts
│
├── storage/
│   ├── local.ts
│   └── secure.ts
│
├── i18n-core/
│   ├── parser.ts
│   └── loader.ts
│
├── feature-flags/
│   └── engine.ts
│
└── utils/
```

No feature imports another feature through `lib`.

---

## 12. i18n Feature

### Structure

```text
features/i18n/
├── hooks/
│   ├── use-locale.ts
│   ├── use-translate.ts
│   └── use-localized-route.ts
│
├── services/
│   └── i18n-service.ts
│
├── guards/
│   └── locale-guard.tsx
│
├── types.ts
└── index.ts
```

### Locale Keys

- Generated from JSON files
- Type-safe `LocaleKey` union
- Build-time validation

---

## 13. Data & Result Types

### Result Pattern

```ts
export interface Result {
  message: LocaleKey;
  severity: SeverityLevel;
  args?: Record<string, string | number | boolean>;
  validationErrors?: Record<string, ValidationError[]>;
}

export interface ResultT<T> extends Result {
  value: T | null;
}
```

### Pagination

```ts
export interface PagedListRequest {
  page?: number;
  size?: number;
  search?: string | null;
  sort?: SortDirection | null;
  sortBy?: string | null;
}
```

---

## 14. Data Tables

Generic table components live outside features.

```text
components/data-table/
├── data-table.tsx
├── types.ts
├── pagination.tsx
└── sorting.ts
```

Feature-specific column logic stays in the feature.

---

## 15. Events & Multi-Tab Sync

- Typed event bus
- BroadcastChannel support
- Feature events defined inside features

Use cases:

- Logout sync
- Theme change
- Locale change

---

## 16. Feature Flags

- Engine lives in `lib`
- Flags consumed in features
- Typed access only

---

## 17. Notifications

- Global notification service
- Feature-aware helpers
- Result-based notifications

---

## 18. Content & Markdown

- Markdown rendered at build time
- Navigation generated from headings
- Used for public content

---

## 19. OTP Feature

```text
features/otp/
├── components/
├── hooks/
├── services/
├── schemas.ts
└── index.ts
```

Global OTP dialog, feature-owned logic.

---

## 20. Bot Protection

- Widget abstraction
- Turnstile support
- Feature-owned integration

---

## 21. Theming Feature

```text
features/theme/
├── hooks/
├── services/
├── events.ts
└── index.ts
```

Syncs across tabs.

---

## 22. Image Handling

- Next Image component
- Static assets only
- Feature decides usage

---

## 23. Animations

- Minimal motion
- Shared primitives only
- Feature decides when to animate

---

## 24. Testing

- MSW for API mocking
- Feature-level test ownership
- No global test state

---

## 25. Explicit Non-Goals

- SSR
- Server Actions
- Backend integration

---

## 26. Final Architecture Rule (Put This Everywhere)

> **If code belongs to a feature, it lives in that feature.  
> Global code must be domain-free.**

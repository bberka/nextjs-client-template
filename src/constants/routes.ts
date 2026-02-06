export const ROUTES = {
  HOME: "/",
  PRICING: "/pricing",
  ANNOUNCEMENTS: "/announcements",
  BLOG: "/blog",
  CHANGELOGS: "/changelogs",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  ROADMAP: "/roadmap",
  FAQS: "/faqs",
  STATUS: "/status",
  FEATURES: "/features",
  FEEDBACK: "/feedback",
  CONTACT: "/contact",
  DOCS: "/docs",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_ROLES: "/admin/roles",
  ADMIN_PERMISSIONS: "/admin/permissions",
  ADMIN_AUDIT_LOG: "/admin/audit-log",
} as const;

export function localizedRoute(locale: string, route: string): string {
  return `/${locale}${route}`;
}

export function blogDetailRoute(locale: string, slug: string): string {
  return `/${locale}/blog/${slug}`;
}

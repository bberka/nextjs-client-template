export { LoginForm } from "./components/login-form";
export { RegisterForm } from "./components/register-form";
export { ForgotPasswordForm } from "./components/forgot-password-form";
export { LogoutButton } from "./components/logout-button";
export { UserMenu } from "./components/user-menu";

export { useLogin } from "./hooks/use-login";
export { useRegister } from "./hooks/use-register";
export { useLogout } from "./hooks/use-logout";
export { useForgotPassword } from "./hooks/use-forgot-password";
export { useCurrentUser } from "./hooks/use-current-user";
export { useAuthStore } from "./hooks/use-auth";

export { AuthGuard } from "./guards/auth-guard";
export { GuestGuard } from "./guards/guest-guard";

export { AUTH_EVENTS } from "./events";
export { hasPermission, Permission } from "./permissions";

export type { User, LoginRequest, RegisterRequest, ForgotPasswordRequest } from "./types";
export { UserRole } from "./types";

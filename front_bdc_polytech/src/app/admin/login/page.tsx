import { redirect } from "next/navigation";

// Login page moved to /login (root level) to avoid being wrapped by admin layout
export default function AdminLoginRedirect() {
  redirect("/login");
}

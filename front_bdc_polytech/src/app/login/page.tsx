import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Connexion — BDC Admin" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error } = await searchParams;

  async function loginAction(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/login?error=1");
      }
      throw err;
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-[var(--text)]">Espace admin</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">BDC Polytech Sorbonne</p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              Identifiants incorrects.
            </div>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--text)]">
                Identifiant
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="mt-1 block w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text)]">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 block w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

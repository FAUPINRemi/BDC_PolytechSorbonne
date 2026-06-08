import { auth, signOut } from "@/auth";
import Link from "next/link";

export const metadata = { title: "Admin — BDC Polytech Sorbonne" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware handles protection — auth() here is just for display
  const session = await auth();

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    // Fixed overlay covers the public Header/Footer from root layout
    <div className="fixed inset-0 z-50 flex bg-gray-50">
      <aside className="flex w-56 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Admin</p>
          <p className="mt-0.5 text-sm font-bold text-gray-800">BDC Polytech</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Tableau de bord
          </Link>
          <Link
            href="/admin/recettes"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Recettes
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
            target="_blank"
          >
            Voir le site ↗
          </Link>
        </nav>

        <div className="border-t border-gray-100 p-3">
          {session?.user?.name && (
            <p className="px-3 py-1 text-xs text-gray-400">{session.user.name}</p>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}

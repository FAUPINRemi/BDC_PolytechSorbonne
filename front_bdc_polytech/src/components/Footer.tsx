import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-[var(--text)]">BDC Polytech Sorbonne</p>
          <p className="mt-1 text-sm text-[var(--muted)]">L&apos;asso cuisine de Polytech Sorbonne.</p>
        </div>

        <div className="flex gap-8 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-[var(--text)]">Navigation</p>
            <ul className="space-y-1 text-[var(--muted)]">
              <li><Link href="/" className="hover:text-[var(--brand)]">Accueil</Link></li>
              <li><Link href="/recettes" className="hover:text-[var(--brand)]">Recettes</Link></li>
              <li><Link href="/infos" className="hover:text-[var(--brand)]">À propos</Link></li>
            </ul>
          </div>
          <div className="space-y-2" id="contact">
            <p className="font-semibold text-[var(--text)]">Contact</p>
            <ul className="space-y-1 text-[var(--muted)]">
              <li>mariette.garnier@gmail.com</li>
              <li><Link href="/admin" className="text-xs hover:text-[var(--brand)]">Admin</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} BDC Polytech Sorbonne. Fait avec passion.
      </div>
    </footer>
  );
}

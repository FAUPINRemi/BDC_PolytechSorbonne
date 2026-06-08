import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpg";

const nav = [
  { href: "/recettes", label: "Recettes" },
  { href: "/infos", label: "À propos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 -mx-4 border-b border-[var(--border)] bg-[var(--bg)]/85 px-4 backdrop-blur-md">
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-[var(--brand)]/20 transition group-hover:ring-[var(--brand)]/50">
            <Image
              src={logo}
              alt="Logo BDC Polytech Sorbonne"
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: "var(--font-fraunces, Georgia, serif)" }}>
              BDC
            </div>
            <div className="text-xs text-[var(--muted)]">Polytech Sorbonne</div>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/infos#contact"
            className="ml-2 rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-hover)] hover:shadow-md"
          >
            Nous rejoindre
          </Link>
        </nav>
      </div>
    </header>
  );
}

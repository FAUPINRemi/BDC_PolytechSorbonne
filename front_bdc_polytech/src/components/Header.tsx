import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpg";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/recettes", label: "Recettes" },
  { href: "/infos", label: "Infos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 -mx-4 border-b border-black/5 bg-[var(--bg)]/80 px-4 backdrop-blur">
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
            <Image
              src={logo}
              alt="Logo BDC Polytech Sorbonne"
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">BDC</div>
            <div className="text-xs text-[var(--muted)]">Polytech Sorbonne</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="ml-2 rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-black/10 hover:bg-[var(--brand-2)]"
          >
            Nous contacter
          </a>
        </nav>
      </div>
    </header>
  );
}

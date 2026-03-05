export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8 text-sm text-[var(--muted)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>BDC Polytech Sorbonne. Tous droits réservés.</p>
        <p id="contact">
          Contact : <span className="font-medium text-black/80">contact@exemple.fr</span>
        </p>
      </div>
    </footer>
  );
}

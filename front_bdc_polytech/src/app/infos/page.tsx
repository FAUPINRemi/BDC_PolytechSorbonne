export default function InfosPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Informations</h1>
        <p className="text-[var(--muted)]">
          Présentation de l’association, fonctionnement, et contact.
        </p>
      </header>

      <section className="rounded-3xl border border-black/10 bg-[var(--panel)] p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Qui sommes-nous</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Le BDC Polytech Sorbonne est une association dédiée à la cuisine, aux ateliers, et au partage.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[var(--bg)] p-6 ring-1 ring-black/10">
            <h3 className="text-sm font-semibold">Horaires</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              À définir. Ajoute ici les créneaux de l’asso (ex : jeudi soir, 19h-21h).
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--bg)] p-6 ring-1 ring-black/10">
            <h3 className="text-sm font-semibold">Adhésion</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Modalités à préciser (cotisation, inscription, accès aux ateliers).
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 p-6">
          <h3 className="text-sm font-semibold">Contact</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">Email : contact@exemple.fr</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Réseaux : ajoute les liens Instagram, Discord, ou site Polytech.
          </p>
        </div>
      </section>
    </div>
  );
}

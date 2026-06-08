export const metadata = {
  title: "À propos — BDC Polytech Sorbonne",
};

export default function InfosPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
          L&apos;association
        </p>
        <h1 className="font-display text-4xl font-black text-[var(--text)]">À propos du BDC</h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          Présentation de l&apos;association, fonctionnement, et contact.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-[var(--panel)] p-8 shadow-sm ring-1 ring-[var(--border)]">
          <div className="text-4xl">👋</div>
          <h2 className="mt-4 font-display text-2xl font-bold text-[var(--text)]">Qui sommes-nous ?</h2>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">
            Le BDC Polytech Sorbonne est l&apos;association de cuisine des étudiants de Polytech Sorbonne. Notre mission : rendre la cuisine accessible, fun et conviviale, que tu saches déjà cuisiner ou pas du tout.
          </p>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">
            On organise des ateliers réguliers, on partage des recettes, et on mange ensemble. Simple, non ?
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-[var(--brand-soft)] p-7">
            <h3 className="font-display text-lg font-bold text-[var(--text)]">Ateliers & horaires</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Les ateliers ont lieu régulièrement dans les locaux de l&apos;école. Consulte nos réseaux pour les prochaines dates.
            </p>
          </div>

          <div className="rounded-3xl bg-[var(--accent)]/20 p-7">
            <h3 className="font-display text-lg font-bold text-[var(--text)]">Adhésion</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              L&apos;adhésion est ouverte à tous les étudiants de Polytech Sorbonne. Contacte-nous pour les modalités et tarifs.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="rounded-3xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-hover)] p-10 text-white">
        <h2 className="font-display text-3xl font-black">Nous rejoindre</h2>
        <p className="mt-3 max-w-xl text-white/80">
          Une question, envie de rejoindre l&apos;asso, ou juste curieux·se ? On est facile à trouver.
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Email</p>
            <p className="mt-1 font-semibold">contact@bdc-polytech.fr</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Instagram</p>
            <p className="mt-1 font-semibold">@bdc_polytech</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Discord</p>
            <p className="mt-1 font-semibold">Lien à venir</p>
          </div>
        </div>
      </section>
    </div>
  );
}

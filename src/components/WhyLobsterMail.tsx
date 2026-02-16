export function WhyLobsterMail() {
  return (
    <section className="border-t border-edge px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Why LobsterMail
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="glass rounded-2xl p-8 transition-all duration-300 hover:bg-surface-4">
            <p className="text-base font-semibold sm:text-lg">
              Your inbox stays yours.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
              Your agent never touches your personal email.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 transition-all duration-300 hover:bg-surface-4">
            <p className="text-base font-semibold sm:text-lg">
              Custom domains.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
              Send from you@yourcompany.com. We handle the DNS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

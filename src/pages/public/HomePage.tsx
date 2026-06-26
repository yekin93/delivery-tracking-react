export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-slate-900 px-6 py-16 text-white">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-300">
          Delivery platform
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold">
          Track restaurants, couriers, orders, and customers from one place.
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          A simple starting point for the multi-role delivery tracking frontend.
        </p>
      </section>

      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold">Advertisement Banner</h2>
        <p className="mt-2 text-slate-600">
          Featured campaign or promotion placeholder.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Restaurants</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Restaurant list placeholder</h3>
            <p className="mt-2 text-sm text-slate-600">
              Public restaurants will be listed here later.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

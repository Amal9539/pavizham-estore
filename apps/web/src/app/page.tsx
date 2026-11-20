
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-wide text-green-800">
            PAVIZHAM
          </h1>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#" className="hover:text-green-700">Home</a>
            <a href="#" className="hover:text-green-700">Shop</a>
            <a href="#" className="hover:text-green-700">About</a>
            <a href="#" className="hover:text-green-700">Contact</a>
          </nav>

          <button className="rounded-lg bg-green-800 px-5 py-2 text-white hover:bg-green-900">
            Cart (0)
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-green-50">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="mb-4 font-semibold uppercase tracking-widest text-green-700">
            Welcome to Pavizham E-Store
          </p>

          <h2 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Quality Products.
            <br />
            Better Shopping.
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-gray-600">
            Discover quality products at great prices.
            Enjoy a simple, secure and convenient shopping experience.
          </p>

          <button className="rounded-lg bg-green-800 px-8 py-3 font-semibold text-white hover:bg-green-900">
            Explore Products
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Shop by Category
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {["Electronics", "Fashion", "Home & Living"].map((category) => (
            <div
              key={category}
              className="rounded-xl border border-gray-200 p-10 text-center transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{category}</h3>
              <p className="mt-3 text-sm text-gray-500">
                Explore our collection
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-8 text-center text-white">
        <p className="font-semibold">Pavizham E-Store</p>
        <p className="mt-2 text-sm text-gray-400">
          © 2026 Pavizham E-Store. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

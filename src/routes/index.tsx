import { createFileRoute, Link } from "@tanstack/react-router";
import { featuredProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopSimple — everyday essentials, thoughtfully stocked" },
      {
        name: "description",
        content:
          "A calm little shop of homeware and desk goods. Browse the catalogue, order in two taps and keep every order in one tidy history.",
      },
      { property: "og:title", content: "ShopSimple — everyday essentials" },
      {
        property: "og:description",
        content: "A calm little shop of homeware and desk goods. Order in two taps.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  {
    title: "Browse",
    copy: "Search or filter the catalogue and find the pieces you want.",
    tone: "brand" as const,
  },
  {
    title: "Order",
    copy: "Tidy your cart, adjust quantities, and watch the total update.",
    tone: "brand" as const,
  },
  {
    title: "Confirm",
    copy: "Add your details, submit, and find it safe in your history.",
    tone: "accent" as const,
  },
];

function Index() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="glass-panel relative overflow-hidden rounded-3xl">
          <div className="relative z-10 max-w-xl px-6 py-12 sm:px-10 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              New season · Small store, real care
            </span>
            <h1 className="mt-5 max-w-[30ch] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Everyday essentials, thoughtfully stocked.
            </h1>
            <p className="mt-4 max-w-[46ch] text-base text-muted-foreground sm:text-lg">
              A calm little shop of homeware and desk goods. Order in two taps, track it all in one
              tidy history.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
              >
                Browse Catalogue
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full bg-card/80 px-5 py-3 text-sm font-medium shadow-soft backdrop-blur-xl"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-24 size-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-8 size-56 rounded-full bg-haze/40 blur-3xl" />
        </div>
      </section>

      <section className="pb-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="max-w-[40ch] text-2xl font-semibold tracking-tight">Featured this week</h2>
          <Link to="/catalogue" className="shrink-0 text-sm font-medium text-brand">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index === 0} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-12">
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <h2 className="max-w-[40ch] text-2xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-card/70 p-5 shadow-soft">
                <span
                  className={`grid size-9 place-items-center rounded-xl text-sm font-semibold ${
                    step.tone === "accent" ? "bg-accent/15 text-accent" : "bg-brand/10 text-brand"
                  }`}
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 text-sm font-medium">{step.title}</h3>
                <p className="mt-1 max-w-[30ch] text-sm text-muted-foreground">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

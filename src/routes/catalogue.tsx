import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue — ShopSimple" },
      {
        name: "description",
        content:
          "Browse every ShopSimple product: kitchen, home, desk and bath essentials. Search by name or filter by category.",
      },
      { property: "og:title", content: "Catalogue — ShopSimple" },
      {
        property: "og:description",
        content: "Kitchen, home, desk and bath essentials, all in one small catalogue.",
      },
    ],
  }),
  component: Catalogue,
});

function Catalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = !q || product.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Catalogue</h1>
      <p className="mt-2 max-w-[52ch] text-muted-foreground">
        Eight everyday pieces, picked to last. Search for something specific or filter by room.
      </p>

      <div className="glass-panel mt-6 flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="field"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                category === option
                  ? "bg-brand text-brand-foreground"
                  : "bg-card/80 text-muted-foreground shadow-soft hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="glass-panel mt-6 rounded-2xl p-10 text-center">
          <p className="text-sm font-medium">No products match that search.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different word or choose another category.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your order — ShopSimple" },
      {
        name: "description",
        content: "Review the items in your ShopSimple order, adjust quantities and see your total.",
      },
      { property: "og:title", content: "Your order — ShopSimple" },
      {
        property: "og:description",
        content: "Adjust quantities and review your running total before checking out.",
      },
    ],
  }),
  component: CartPage,
});

function CartContents() {
  const { items, total, count, addItem, decrementItem, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <p className="text-sm font-medium">Your order is empty</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a few pieces from the catalogue and they'll show up here.
        </p>
        <Link
          to="/catalogue"
          className="mt-6 inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-6">
      <ul className="divide-y divide-hairline">
        {items.map((item) => (
          <li
            key={item.product.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              width={1024}
              height={1024}
              loading="lazy"
              className="size-16 shrink-0 rounded-xl bg-secondary object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.product.price)} each
              </p>
            </div>
            <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
              <div className="flex items-center gap-1 rounded-full bg-card/80 p-1 shadow-soft">
                <button
                  type="button"
                  aria-label={`Remove one ${item.product.name}`}
                  onClick={() => decrementItem(item.product.id)}
                  className="grid size-7 place-items-center rounded-full text-base leading-none hover:bg-secondary"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Add one ${item.product.name}`}
                  onClick={() => addItem(item.product.id)}
                  className="grid size-7 place-items-center rounded-full text-base leading-none hover:bg-secondary"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                className="text-sm font-medium text-destructive"
              >
                Delete
              </button>
            </div>
            <p className="text-sm font-semibold text-brand sm:text-right">
              {formatPrice(item.lineTotal)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">
        <span className="text-sm text-muted-foreground">
          Total · {count} {count === 1 ? "item" : "items"}
        </span>
        <span className="text-xl font-semibold">{formatPrice(total)}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/checkout"
          className="inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
        >
          Review Order
        </Link>
        <Link
          to="/catalogue"
          className="inline-flex items-center rounded-full bg-card/80 px-5 py-3 text-sm font-medium shadow-soft"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}

function CartPage() {
  return (
    <section className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Create order</h1>
      <p className="mt-2 max-w-[52ch] text-muted-foreground">
        Adjust quantities, remove anything you've changed your mind about, then review.
      </p>
      <div className="mt-6">
        <ClientOnly
          fallback={<div className="glass-panel h-48 rounded-3xl" />}
        >
          <CartContents />
        </ClientOnly>
      </div>
    </section>
  );
}

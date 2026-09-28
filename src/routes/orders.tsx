import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrders, type Order } from "@/lib/orders";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Order history — ShopSimple" },
      {
        name: "description",
        content:
          "Every order you've placed at ShopSimple, with its order number, date, total, status and items.",
      },
      { property: "og:title", content: "Order history — ShopSimple" },
      { property: "og:description", content: "Look back at all of your past ShopSimple orders." },
    ],
  }),
  component: OrdersPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  if (orders.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <p className="text-sm font-medium">No orders yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          When you submit an order it will appear here with its number and total.
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
    <ul className="space-y-3">
      {orders.map((order) => {
        const isOpen = expanded === order.id;
        return (
          <li key={order.id} className="glass-panel rounded-2xl p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : order.id)}
              aria-expanded={isOpen}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-left"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
                  {order.status}
                </span>
                <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                <span className="text-xs text-muted-foreground">{isOpen ? "Hide" : "Details"}</span>
              </div>
            </button>

            {isOpen && (
              <div className="mt-4 border-t border-hairline pt-4">
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-3 text-sm">
                      <span className="min-w-0 text-muted-foreground">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="shrink-0 font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Delivering to {order.customer.name} · {order.customer.address}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function OrdersPage() {
  return (
    <section className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Order history</h1>
      <p className="mt-2 max-w-[52ch] text-muted-foreground">
        Orders are saved in this browser. Tap one to see the items it contained.
      </p>
      <div className="mt-6">
        <ClientOnly fallback={<div className="glass-panel h-40 rounded-3xl" />}>
          <OrdersList />
        </ClientOnly>
      </div>
    </section>
  );
}

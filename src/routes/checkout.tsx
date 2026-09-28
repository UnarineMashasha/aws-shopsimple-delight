import { createFileRoute, Link, useNavigate, ClientOnly } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { generateOrderId, saveOrder, type Order } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Confirm and submit — ShopSimple" },
      {
        name: "description",
        content:
          "Check your ShopSimple order summary and add your name, email and delivery address before submitting.",
      },
      { property: "og:title", content: "Confirm and submit — ShopSimple" },
      {
        property: "og:description",
        content: "Review your items and add delivery details to place your order.",
      },
    ],
  }),
  component: CheckoutPage,
});

type Errors = { name?: string; email?: string; address?: string };

function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState<Errors>({});

  if (items.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <p className="text-sm font-medium">There's nothing to confirm yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Add some items to your order first.</p>
        <Link
          to="/catalogue"
          className="mt-6 inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (form.address.trim().length < 10)
      next.address = "Please enter a delivery address with street, city and postcode.";
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const order: Order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: "Submitted",
      total,
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      },
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };

    saveOrder(order);
    clearCart();
    void navigate({ to: "/order-confirmed/$orderId", params: { orderId: order.id } });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-5 sm:p-6" noValidate>
        <h2 className="text-lg font-semibold">Delivery details</h2>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Full name</span>
            <input
              className="field mt-1.5"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ada Mokoena"
            />
            {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              className="field mt-1.5"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ada@example.com"
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-destructive">{errors.email}</span>
            )}
          </label>
          <label className="block">
            <span className="text-sm font-medium">Delivery address</span>
            <textarea
              className="field mt-1.5 min-h-24"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="14 Rosebank Road, Cape Town, 7708"
            />
            {errors.address && (
              <span className="mt-1 block text-xs text-destructive">{errors.address}</span>
            )}
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
          >
            Confirm and Submit Order
          </button>
          <Link
            to="/cart"
            className="inline-flex items-center rounded-full bg-card/80 px-5 py-3 text-sm font-medium shadow-soft"
          >
            Back to Edit
          </Link>
        </div>
      </form>

      <aside className="glass-panel h-fit rounded-3xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.product.id} className="flex items-start justify-between gap-3 text-sm">
              <span className="min-w-0 text-muted-foreground">
                {item.quantity}× {item.product.name}
              </span>
              <span className="shrink-0 font-medium">{formatPrice(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-semibold">{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function CheckoutPage() {
  return (
    <section className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Confirm and submit</h1>
      <p className="mt-2 max-w-[52ch] text-muted-foreground">
        One last look at your items, then tell us where to send them.
      </p>
      <div className="mt-6">
        <ClientOnly fallback={<div className="glass-panel h-64 rounded-3xl" />}>
          <CheckoutForm />
        </ClientOnly>
      </div>
    </section>
  );
}

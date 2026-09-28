import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — ShopSimple" },
      {
        name: "description",
        content:
          "Send the ShopSimple team a message, or reach us by phone, email or at our shop address.",
      },
      { property: "og:title", content: "Contact us — ShopSimple" },
      { property: "og:description", content: "Questions about an order? Send us a message." },
    ],
  }),
  component: ContactPage,
});

type Errors = { name?: string; email?: string; message?: string };

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Please write a little more so we can help.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Contact us</h1>
      <p className="mt-2 max-w-[52ch] text-muted-foreground">
        Questions about an order, a product or delivery? We usually reply within a day.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-5 sm:p-6" noValidate>
          {sent && (
            <p className="mb-4 rounded-2xl bg-brand/10 px-4 py-3 text-sm font-medium text-brand">
              Thanks — your message has been sent. We'll be in touch shortly.
            </p>
          )}
          <div className="grid gap-4">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                className="field mt-1.5"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ada Mokoena"
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-destructive">{errors.name}</span>
              )}
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
              <span className="text-sm font-medium">Message</span>
              <textarea
                className="field mt-1.5 min-h-32"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
              />
              {errors.message && (
                <span className="mt-1 block text-xs text-destructive">{errors.message}</span>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
          >
            Send message
          </button>
        </form>

        <aside className="glass-panel h-fit rounded-3xl p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Visit the shop</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-medium">Address</dt>
              <dd className="mt-1 text-muted-foreground">
                14 Rosebank Road
                <br />
                Cape Town, 7708
              </dd>
            </div>
            <div>
              <dt className="font-medium">Phone</dt>
              <dd className="mt-1 text-muted-foreground">+27 21 555 0134</dd>
            </div>
            <div>
              <dt className="font-medium">Email</dt>
              <dd className="mt-1 text-muted-foreground">hello@shopsimple.example</dd>
            </div>
            <div>
              <dt className="font-medium">Hours</dt>
              <dd className="mt-1 text-muted-foreground">Mon–Fri, 9am–5pm</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs text-muted-foreground">
            These contact details are placeholders — send me the real ones and I'll swap them in.
          </p>
        </aside>
      </div>
    </section>
  );
}

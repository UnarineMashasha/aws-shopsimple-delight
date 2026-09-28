import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmed/$orderId")({
  head: () => ({
    meta: [
      { title: "Order submitted — ShopSimple" },
      {
        name: "description",
        content: "Your ShopSimple order has been submitted. Keep your order number for reference.",
      },
      { property: "og:title", content: "Order submitted — ShopSimple" },
      { property: "og:description", content: "Thanks for your order at ShopSimple." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const { orderId } = Route.useParams();

  return (
    <section className="py-16 sm:py-24">
      <div className="glass-panel mx-auto max-w-lg rounded-3xl p-8 text-center sm:p-10">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand">
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Order submitted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks! We've saved your order and emailed a copy of these details to you.
        </p>
        <p className="mt-6 rounded-2xl bg-card/80 px-4 py-3 text-sm shadow-soft">
          Order number <span className="font-semibold text-brand">{orderId}</span>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/orders"
            className="inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
          >
            View order history
          </Link>
          <Link
            to="/catalogue"
            className="inline-flex items-center rounded-full bg-card/80 px-5 py-3 text-sm font-medium shadow-soft"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

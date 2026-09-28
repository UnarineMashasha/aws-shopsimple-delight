import { Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/orders", label: "Order History" },
  { to: "/contact", label: "Contact" },
] as const;

function CartCount() {
  const { count } = useCart();
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">
      {count}
    </span>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 mx-3 mt-3 sm:mx-auto sm:w-full sm:max-w-6xl">
      <div className="glass-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3 md:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand text-sm font-semibold text-brand-foreground">
            S
          </span>
          <span className="truncate text-base font-semibold tracking-tight">ShopSimple</span>
        </Link>
        <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/cart"
          aria-label="View your order"
          className="relative grid size-10 shrink-0 place-items-center rounded-full bg-card/80 text-foreground shadow-soft backdrop-blur-xl transition-colors hover:bg-card"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8h12l-1 12H7L6 8z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          <ClientOnly fallback={null}>
            <CartCount />
          </ClientOnly>
        </Link>
      </div>
      <nav className="mt-2 flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-muted-foreground md:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeOptions={{ exact: link.to === "/" }}
            activeProps={{ className: "bg-brand text-brand-foreground" }}
            className="glass-panel shrink-0 rounded-full px-3 py-1.5"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

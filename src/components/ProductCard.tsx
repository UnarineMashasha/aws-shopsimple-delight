import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();

  return (
    <article className="glass-panel rounded-[18px] p-3">
      <img
        src={product.image}
        alt={product.name}
        width={1024}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className="aspect-square w-full rounded-xl bg-secondary object-cover"
      />
      <div className="mt-3 px-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{product.blurb}</p>
        <p className="mt-2 text-sm font-semibold text-brand">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => addItem(product.id)}
          className="mt-3 w-full rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-brand hover:text-brand-foreground"
        >
          Add to Order
        </button>
      </div>
    </article>
  );
}

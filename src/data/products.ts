import pourOverSet from "@/assets/pour-over-set.jpg";
import storageBasket from "@/assets/storage-basket.jpg";
import deskLamp from "@/assets/desk-lamp.jpg";
import handSoap from "@/assets/hand-soap.jpg";
import teaTowels from "@/assets/tea-towels.jpg";
import deskTray from "@/assets/desk-tray.jpg";
import planter from "@/assets/planter.jpg";
import candle from "@/assets/candle.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  blurb: string;
};

export const categories = ["All", "Kitchen", "Home", "Desk", "Bath"] as const;

export const products: Product[] = [
  {
    id: "pour-over-set",
    name: "Sage Pour-Over Set",
    price: 34,
    category: "Kitchen",
    image: pourOverSet,
    blurb: "Glazed ceramic dripper, carafe and mug.",
  },
  {
    id: "storage-basket",
    name: "Linen Storage Basket",
    price: 22,
    category: "Home",
    image: storageBasket,
    blurb: "Hand-woven natural fibre with soft handles.",
  },
  {
    id: "desk-lamp",
    name: "Amber Desk Lamp",
    price: 58,
    category: "Desk",
    image: deskLamp,
    blurb: "Warm glass dome with a dimmable bulb.",
  },
  {
    id: "hand-soap",
    name: "Sage Hand Soap",
    price: 12,
    category: "Bath",
    image: handSoap,
    blurb: "Sage and citrus, with botanical extracts.",
  },
  {
    id: "tea-towels",
    name: "Striped Tea Towels",
    price: 18,
    category: "Kitchen",
    image: teaTowels,
    blurb: "Set of four stonewashed linen towels.",
  },
  {
    id: "desk-tray",
    name: "Walnut Desk Tray",
    price: 46,
    category: "Desk",
    image: deskTray,
    blurb: "Solid walnut with four tidy compartments.",
  },
  {
    id: "planter",
    name: "Terracotta Planter",
    price: 16,
    category: "Home",
    image: planter,
    blurb: "Unglazed clay pot with a drainage dish.",
  },
  {
    id: "candle",
    name: "Frosted Soy Candle",
    price: 26,
    category: "Home",
    image: candle,
    blurb: "Hand-poured soy wax, 45 hour burn.",
  },
];

export const featuredProducts = products.slice(0, 4);

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

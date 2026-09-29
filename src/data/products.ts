import canvasTote from "@/assets/bag-canvas-tote.jpg";
import crossbody from "@/assets/bag-crossbody.jpg";
import backpack from "@/assets/bag-backpack.jpg";
import shoulderBag from "@/assets/bag-shoulder.jpg";
import strawBasket from "@/assets/bag-straw.jpg";
import duffel from "@/assets/bag-duffel.jpg";
import beltBag from "@/assets/bag-belt.jpg";
import laptopBag from "@/assets/bag-laptop.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  blurb: string;
};

export const categories = ["All", "Totes", "Shoulder", "Backpacks", "Travel", "Work"] as const;

export const products: Product[] = [
  {
    id: "canvas-tote",
    name: "Everyday Canvas Tote",
    price: 68,
    category: "Totes",
    image: canvasTote,
    blurb: "Heavy cotton canvas with tanned leather handles.",
  },
  {
    id: "crossbody",
    name: "Tan Leather Crossbody",
    price: 145,
    category: "Shoulder",
    image: crossbody,
    blurb: "Smooth leather with a brass clasp and adjustable strap.",
  },
  {
    id: "waxed-backpack",
    name: "Waxed Canvas Backpack",
    price: 165,
    category: "Backpacks",
    image: backpack,
    blurb: "Olive waxed canvas, buckled flap and side pockets.",
  },
  {
    id: "shoulder-bag",
    name: "Noir Shoulder Bag",
    price: 189,
    category: "Shoulder",
    image: shoulderBag,
    blurb: "Structured black leather with a slim gold-fitted strap.",
  },
  {
    id: "straw-basket",
    name: "Straw Market Basket",
    price: 54,
    category: "Totes",
    image: strawBasket,
    blurb: "Hand-woven straw with soft cotton webbing handles.",
  },
  {
    id: "leather-duffel",
    name: "Weekender Duffel",
    price: 275,
    category: "Travel",
    image: duffel,
    blurb: "Full-grain leather, brass hardware and a shoulder strap.",
  },
  {
    id: "belt-bag",
    name: "Quilted Belt Bag",
    price: 42,
    category: "Travel",
    image: beltBag,
    blurb: "Lightweight quilted nylon in sage, worn hip or chest.",
  },
  {
    id: "laptop-bag",
    name: "Navy Laptop Satchel",
    price: 198,
    category: "Work",
    image: laptopBag,
    blurb: "Slim leather satchel with a padded 15-inch sleeve.",
  },
];

export const featuredProducts = products.slice(0, 4);

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

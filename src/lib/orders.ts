export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  status: "Submitted";
  total: number;
  customer: { name: string; email: string; address: string };
  items: OrderItem[];
};

const ORDERS_KEY = "shopsimple.orders";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadOrders(): Order[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Order[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function generateOrderId() {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `SS-${suffix}`;
}

export function saveOrder(order: Order) {
  if (!isBrowser()) return;
  const next = [order, ...loadOrders()];
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}

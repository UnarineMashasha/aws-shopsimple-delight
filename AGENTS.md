<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Cart state lives in `src/context/CartContext.tsx` (React context + localStorage key `shopsimple.cart`) — one source of truth shared by navbar, catalogue, cart and checkout.
- Submitted orders are stored in localStorage via `src/lib/orders.ts` (key `shopsimple.orders`) — the app is static, with no backend.
- Product data is mock data in `src/data/products.ts` with images imported from `src/assets/`.
- Any component reading localStorage renders inside `<ClientOnly>` to avoid SSR hydration mismatches.

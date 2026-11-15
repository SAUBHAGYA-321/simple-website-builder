import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFrame, PageHeading, formatPrice, products, useCart, Minus, Plus, Trash2 } from "@/components/campuskart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [
    { title: "Your cart | CampusKart" }, { name: "description", content: "Review your selected CampusKart items." },
    { property: "og:title", content: "Your cart | CampusKart" }, { property: "og:description", content: "Review your selected CampusKart items." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: CartPage,
});

function CartPage() {
  const { cart, quantity, remove, total } = useCart();
  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.id) })).filter((line) => line.product);
  return <SiteFrame><div className="content-wrap"><PageHeading kicker="Your campus bag" title="Shopping cart" description="Your next semester starts with a good find." />
    {lines.length ? <div className="cart-layout"><div className="cart-list">{lines.map(({ id, quantity: amount, product }) => product && <article className="cart-row" key={id}>
      <img src={product.image} alt={product.title} width={1024} height={1024} loading="lazy" /><div><h3>{product.title}</h3><p>{product.condition} · {product.seller}</p><div className="quantity-control"><button aria-label={`Decrease ${product.title} quantity`} onClick={() => quantity(id, -1)}><Minus size={14} /></button><span>{amount}</span><button aria-label={`Increase ${product.title} quantity`} onClick={() => quantity(id, 1)}><Plus size={14} /></button></div></div>
      <div className="cart-row-end"><strong>{formatPrice(product.price * amount)}</strong><Button variant="ghost" size="icon" aria-label={`Remove ${product.title}`} onClick={() => remove(id)}><Trash2 size={16} /></Button></div>
    </article>)}</div><aside className="cart-summary"><h2>Order summary</h2><div className="summary-line"><span>Items subtotal</span><span>{formatPrice(total)}</span></div><div className="summary-line"><span>Campus hand-off</span><span>Free</span></div><div className="summary-line summary-total"><span>Total</span><span>{formatPrice(total)}</span></div><Button asChild className="checkout-button"><Link to="/checkout">Continue to checkout<ArrowRight size={16} /></Link></Button><p className="form-hint">Demo checkout · no payment collected</p></aside></div>
    : <div className="empty-state"><ShoppingBag size={30} className="text-primary" /><h2>Your bag is taking a study break.</h2><p className="muted-copy">Browse the shelf and add something useful.</p><Button asChild><Link to="/products">Browse items<ArrowRight size={16} /></Link></Button></div>}
  </div></SiteFrame>;
}
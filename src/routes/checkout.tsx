import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoForm, FormField, Input, PageHeading, SiteFrame, Textarea, formatPrice, products, useCart } from "@/components/campuskart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout | CampusKart" }, { name: "description", content: "Choose a campus hand-off point for your sample order." },
    { property: "og:title", content: "Checkout | CampusKart" }, { property: "og:description", content: "Choose a campus hand-off point for your sample order." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: CheckoutPage,
});

function CheckoutPage() {
  const cartState = useCart();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber] = useState(() => `CK-${Math.floor(1000 + Math.random() * 9000)}`);
  const lines = cartState.cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.id) })).filter((line) => line.product);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    cartState.clear();
    setConfirmed(true);
  };
  if (confirmed) return <SiteFrame><div className="content-wrap confirmation"><span className="confirmation-icon"><Check size={26} /></span><p className="eyebrow">All set — in this demo</p><h1 className="display-title">Your hand-off is planned.</h1><p className="muted-copy">Order {orderNumber} · No payment or real order was created.</p><Button asChild className="mt-5"><Link to="/products">Back to the shop</Link></Button></div></SiteFrame>;
  if (!lines.length) return <SiteFrame><div className="content-wrap empty-state"><PageHeading kicker="Campus hand-off" title="Your bag is empty" /><Button asChild><Link to="/products">Browse items</Link></Button></div></SiteFrame>;
  return <SiteFrame><div className="content-wrap"><div className="form-page wide"><PageHeading kicker="One last step" title="Choose a hand-off" description="Arrange a simple campus pick-up with your fellow student." />
    <div className="cart-layout"><form className="form-stack" onSubmit={submit}>
      <FormField label="Your name"><Input autoComplete="name" required placeholder="Name for the hand-off" /></FormField>
      <FormField label="Student email"><Input type="email" autoComplete="email" required placeholder="you@college.edu" /></FormField>
      <FormField label="Campus meeting spot"><Input required placeholder="e.g. Main library entrance" /></FormField>
      <FormField label="Note to seller"><Textarea rows={3} placeholder="A good time to meet, or a quick hello" /></FormField>
      <Button type="submit">Place demo order<MapPin size={16} /></Button>
    </form><aside className="cart-summary"><h2>Order summary</h2>{lines.map(({ id, quantity, product }) => product && <div className="summary-line" key={id}><span>{product.title} × {quantity}</span><span>{formatPrice(product.price * quantity)}</span></div>)}<div className="summary-line summary-total"><span>Total</span><span>{formatPrice(cartState.total)}</span></div><p className="form-hint">No payment is collected in this project.</p></aside></div>
  </div></div></SiteFrame>;
}
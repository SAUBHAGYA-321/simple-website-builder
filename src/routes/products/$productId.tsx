import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, SiteFrame, formatPrice, products, useCart } from "@/components/campuskart";

export const Route = createFileRoute("/products/$productId")({
  head: () => ({ meta: [
    { title: "Item details | CampusKart" },
    { name: "description", content: "See condition, price and seller details for a CampusKart item." },
    { property: "og:title", content: "Item details | CampusKart" },
    { property: "og:description", content: "See condition, price and seller details for a CampusKart item." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const { add } = useCart();
  const product = products.find((item) => item.id === productId);
  if (!product) return <SiteFrame><div className="content-wrap empty-state"><PageHeading kicker="CampusKart" title="Item not found" /><Button asChild variant="outline"><Link to="/products"><ArrowLeft size={16} />Back to the shop</Link></Button></div></SiteFrame>;
  return <SiteFrame><div className="content-wrap"><div className="detail-layout">
    <img className="detail-image" src={product.image} alt={product.title} width={1024} height={1024} />
    <div className="detail-copy"><Link to="/products" className="text-link"><ArrowLeft size={16} /> Back to browse</Link><p className="eyebrow mt-7">{product.category} · {product.condition}</p><h1 className="display-title">{product.title}</h1><p className="detail-price">{formatPrice(product.price)}</p><p className="muted-copy">{product.description}</p>
      <div className="detail-meta"><div><span>Condition</span><strong>{product.condition}</strong></div><div><span>Seller</span><strong>{product.seller}</strong></div></div>
      <Button size="lg" onClick={() => add(product.id)}><CheckCircle2 size={17} /> Add to cart</Button><p className="form-hint">A student-to-student listing in this sample project.</p>
    </div>
  </div></div></SiteFrame>;
}
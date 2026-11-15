import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, ChevronRight, GraduationCap, HeartHandshake, Laptop, Minus, Plus, Search, ShoppingBag, Sparkles, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice, products, type Product } from "@/lib/campuskart-data";

type CartLine = { id: string; quantity: number };
const CART_KEY = "campuskart-demo-cart";

export function useCart() {
  const [cart, setCart] = useState<CartLine[]>([]);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) setCart(JSON.parse(saved) as CartLine[]);
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
    const sync = () => {
      try {
        const saved = window.localStorage.getItem(CART_KEY);
        setCart(saved ? (JSON.parse(saved) as CartLine[]) : []);
      } catch {
        setCart([]);
      }
    };
    window.addEventListener("campuskart-cart", sync);
    return () => window.removeEventListener("campuskart-cart", sync);
  }, []);

  const update = (next: CartLine[]) => {
    setCart(next);
    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("campuskart-cart"));
  };
  const add = (id: string) => {
    const line = cart.find((item) => item.id === id);
    update(line ? cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { id, quantity: 1 }]);
  };
  const quantity = (id: string, amount: number) => update(cart.flatMap((item) => {
    if (item.id !== id) return [item];
    const nextAmount = item.quantity + amount;
    return nextAmount > 0 ? [{ ...item, quantity: nextAmount }] : [];
  }));
  const remove = (id: string) => update(cart.filter((item) => item.id !== id));
  const clear = () => update([]);
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (products.find((product) => product.id === item.id)?.price ?? 0) * item.quantity, 0);
  return { cart, add, quantity, remove, clear, count, total };
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const { count } = useCart();
  return <div className="site-shell">
    <header className="site-header"><div className="header-inner">
      <Link to="/" className="brand-mark"><span className="brand-icon"><BookOpen size={19} /></span> CampusKart</Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Home</Link><Link to="/products">Browse</Link><Link to="/about">About</Link>
      </nav>
      <div className="header-actions"><Link className="account-link" to="/login">Sign in</Link><Link className="cart-link" to="/cart" aria-label={`Cart, ${count} items`}><ShoppingBag size={19} /><span className="cart-count">{count}</span></Link></div>
    </div></header>
    <main className="site-main">{children}</main>
    <footer className="site-footer"><div className="footer-inner"><span>© 2026 CampusKart · Made for campus, by campus.</span><div className="footer-links"><Link to="/products">Browse items</Link><Link to="/about">Contact</Link><Link to="/register">Sell an item</Link></div></div></footer>
  </div>;
}

export function PageHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return <div className="page-heading"><p className="eyebrow">{kicker}</p><h1 className="section-title">{title}</h1>{description && <p className="muted-copy">{description}</p>}</div>;
}

export function ProductCard({ product, onAdd }: { product: Product; onAdd: (id: string) => void }) {
  return <article className="product-card">
    <Link to="/products/$productId" params={{ productId: product.id }} className="product-photo-link" aria-label={`View ${product.title}`}>
      <img src={product.image} alt={product.title} width={1024} height={1024} loading="lazy" /><span className="condition-badge">{product.condition}</span>
    </Link>
    <div className="product-info"><span className="product-category">{product.category}</span><Link className="product-name" to="/products/$productId" params={{ productId: product.id }}>{product.title}</Link>
      <div className="product-price-row"><span className="product-price">{formatPrice(product.price)}</span><span className="product-seller">{product.seller.split(",")[0]}</span></div>
      <Button className="add-button" variant="outline" size="sm" onClick={() => onAdd(product.id)}><Plus size={15} /> Add to cart</Button>
    </div>
  </article>;
}

export function ProductGrid({ items, onAdd }: { items: Product[]; onAdd: (id: string) => void }) {
  if (!items.length) return <p className="muted-copy">No items found. Try a different search or category.</p>;
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>;
}

export function DemoForm({ title, kicker, description, children, onSubmit, submitLabel, wide = false }: {
  title: string; kicker: string; description?: string; children: ReactNode; onSubmit: (event: FormEvent<HTMLFormElement>) => void; submitLabel: string; wide?: boolean;
}) {
  return <div className={`form-page${wide ? " wide" : ""}`}><PageHeading kicker={kicker} title={title} description={description} /><form className="form-stack" onSubmit={onSubmit}>{children}<Button type="submit" className="w-full">{submitLabel}<ArrowRight size={16} /></Button></form></div>;
}

export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return <div className="form-field"><label>{label}</label>{children}</div>;
}

export function HomePage() {
  const { add } = useCart();
  return <>
    <div className="content-wrap"><section className="home-hero">
      <div className="hero-copy"><p className="eyebrow">Your campus, second-hand</p><h1 className="display-title">Good finds.<br />Better semesters.</h1><p className="muted-copy">Pass along what helped you. Find what you need next. Student essentials, shared one campus at a time.</p>
        <div className="hero-actions"><Button asChild size="lg"><Link to="/products">Explore the shop<ArrowRight size={17} /></Link></Button><Button asChild variant="outline" size="lg"><Link to="/register">Sell an item</Link></Button></div>
      </div>
      <div className="hero-photo"><img src={products[0].image} alt="A stack of used textbooks ready for another semester" width={1024} height={1024} /><div className="hero-tag"><Sparkles size={18} /><div><strong>Pre-loved, well-read</strong><br /><span>Find your next favorite</span></div></div></div>
    </section></div>
    <div className="content-wrap"><div className="feature-strip">
      <div className="feature-item"><span className="feature-icon"><GraduationCap size={22} /></span><div><strong>Made for students</strong><span>From one classmate to another</span></div></div>
      <div className="feature-item"><span className="feature-icon"><HeartHandshake size={22} /></span><div><strong>Give good things a second life</strong><span>Keep useful things in circulation</span></div></div>
      <div className="feature-item"><span className="feature-icon"><Truck size={22} /></span><div><strong>Meet up on campus</strong><span>Easy local hand-offs</span></div></div>
    </div></div>
    <section className="content-wrap section-block"><div className="section-heading"><div><p className="eyebrow">Picked for campus life</p><h2 className="section-title">Popular right now</h2></div><Link className="text-link" to="/products">See everything<ChevronRight size={17} /></Link></div><ProductGrid items={products.slice(0, 4)} onAdd={add} /></section>
    <section className="content-wrap section-block" style={{ paddingTop: 0 }}><div className="section-heading"><div><p className="eyebrow">Find your next useful thing</p><h2 className="section-title">Shop by category</h2></div></div><div className="category-grid">
      <Link className="category-tile" to="/products"><div><strong>Books & notes</strong><span>Course reads, study guides</span></div><BookOpen /></Link>
      <Link className="category-tile" to="/products"><div><strong>Tech & gadgets</strong><span>Everyday campus tech</span></div><Laptop /></Link>
      <Link className="category-tile" to="/products"><div><strong>Study essentials</strong><span>Tools for getting it done</span></div><Sparkles /></Link>
    </div></section>
  </>;
}

export function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="relative filter-input"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} /><Input className="pl-9" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search books, gadgets..." aria-label="Search products" /></div>;
}

export { Input, Textarea, Button, products, formatPrice, Minus, Plus, Trash2, Check };
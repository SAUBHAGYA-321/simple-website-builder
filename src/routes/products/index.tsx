import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid, SearchBox, SiteFrame, PageHeading, products, useCart } from "@/components/campuskart";

export const Route = createFileRoute("/products/")({
  head: () => ({ meta: [
    { title: "Browse campus finds | CampusKart" },
    { name: "description", content: "Search second-hand books, electronics and study gear from fellow students." },
    { property: "og:title", content: "Browse campus finds | CampusKart" },
    { property: "og:description", content: "Search second-hand books, electronics and study gear from fellow students." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductsPage,
});

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const { add } = useCart();
  const filtered = useMemo(() => products.filter((product) => {
    const matchesText = `${product.title} ${product.category} ${product.seller}`.toLowerCase().includes(search.toLowerCase());
    return matchesText && (category === "All categories" || product.category === category);
  }), [search, category]);
  return <SiteFrame><div className="content-wrap"><PageHeading kicker="The campus shelf" title="Browse all finds" description="Good things move on. Find your next useful thing here." />
    <div className="filter-row"><SearchBox value={search} onChange={setSearch} /><select className="filter-select h-9 rounded-md border border-input px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category"><option>All categories</option><option>Books</option><option>Electronics</option><option>Study gear</option></select><span className="muted-copy text-sm">{filtered.length} items</span></div>
    <ProductGrid items={filtered} onAdd={add} />
  </div></SiteFrame>;
}
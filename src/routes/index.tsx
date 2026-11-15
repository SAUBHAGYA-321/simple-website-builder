import { createFileRoute } from "@tanstack/react-router";
import { HomePage, SiteFrame } from "@/components/campuskart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusKart | Good finds for campus life" },
      { name: "description", content: "Buy and sell pre-loved books, tech and study essentials with fellow students." },
      { property: "og:title", content: "CampusKart | Good finds for campus life" },
      { property: "og:description", content: "Buy and sell pre-loved books, tech and study essentials with fellow students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SiteFrame><HomePage /></SiteFrame>;
}

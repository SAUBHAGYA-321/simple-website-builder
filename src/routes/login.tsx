import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoForm, FormField, Input, SiteFrame } from "@/components/campuskart";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign in | CampusKart" }, { name: "description", content: "Sign in to your sample CampusKart account." },
    { property: "og:title", content: "Sign in | CampusKart" }, { property: "og:description", content: "Sign in to your sample CampusKart account." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: LoginPage,
});

function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  return <SiteFrame><DemoForm title="Welcome back" kicker="Student sign in" submitLabel="Sign in" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
    <FormField label="Student email"><Input type="email" autoComplete="email" placeholder="you@college.edu" required /></FormField>
    <FormField label="Password"><Input type="password" autoComplete="current-password" placeholder="Your password" required /></FormField>
    {submitted && <p className="form-success" role="status">Demo only — sign-in is not connected to an account.</p>}
  </DemoForm><p className="form-hint text-center">New around here? <Link className="text-link" to="/register">Create an account</Link></p></SiteFrame>;
}
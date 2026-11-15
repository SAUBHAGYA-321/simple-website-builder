import bookImage from "@/assets/campuskart-books.jpg";
import headphonesImage from "@/assets/campuskart-headphones.jpg";
import calculatorImage from "@/assets/campuskart-calculator.jpg";

export type Product = {
  id: string;
  title: string;
  price: number;
  condition: "Like new" | "Good" | "Fair";
  category: "Books" | "Electronics" | "Study gear";
  image: string;
  seller: string;
  description: string;
};

export const products: Product[] = [
  { id: "engineering-books", title: "Engineering Mechanics — Semester Set", price: 450, condition: "Good", category: "Books", image: bookImage, seller: "Aarav, CSE '27", description: "A handy set of engineering texts with clean pages and a few useful margin notes." },
  { id: "wireless-headphones", title: "Wireless Study Headphones", price: 850, condition: "Like new", category: "Electronics", image: headphonesImage, seller: "Meera, Design '26", description: "Comfortable over-ear headphones, tested and ready for the library." },
  { id: "scientific-calculator", title: "Scientific Calculator + Notes", price: 320, condition: "Good", category: "Study gear", image: calculatorImage, seller: "Kabir, Mechanical '27", description: "A reliable calculator bundled with handwritten formula notes." },
  { id: "campus-book-stack", title: "First-year Textbook Bundle", price: 550, condition: "Fair", category: "Books", image: bookImage, seller: "Riya, Civil '28", description: "A practical starter bundle for first-year classes; some highlighting inside." },
  { id: "desk-headphones", title: "Everyday Wired Headphones", price: 400, condition: "Good", category: "Electronics", image: headphonesImage, seller: "Dev, ECE '27", description: "Simple headphones in good working condition, great for daily study sessions." },
  { id: "exam-calculator", title: "Exam-ready Calculator", price: 280, condition: "Like new", category: "Study gear", image: calculatorImage, seller: "Nisha, IT '26", description: "A lightly used scientific calculator with a clear display and fresh battery." },
];

export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
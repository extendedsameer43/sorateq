import { NavbarDemo } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <NavbarDemo />
      
      {/* Hero Section */}
      <Hero />
    </div>
  );
}

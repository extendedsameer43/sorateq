import { NavbarDemo } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <NavbarDemo />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
    </div>
  );
}

import { NavbarDemo } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { IsThisYou } from "@/components/is-this-you";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <NavbarDemo />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Is This You Section */}
      <IsThisYou />
      
      {/* Features Section */}
      <Features />
    </div>
  );
}

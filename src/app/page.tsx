import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header, ScrollProgress } from "@/components/header";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <Products />
        <About />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

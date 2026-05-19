import { WovenLightHero } from "@/components/ui/woven-light-hero";
import ProductList from "@/components/product-list";
import CategorySection from "@/components/category-section";
import BrandSection from "@/components/brand-section";
import { SunnyBackground } from "@/components/ui/sunny-background";

export default function Home() {
  return (
    <SunnyBackground>
      <div className="min-h-screen">
        <WovenLightHero />
        <BrandSection />
        <ProductList title="Our Collection" showFilters={true} />
        <CategorySection />
      </div>
    </SunnyBackground>
  );
}
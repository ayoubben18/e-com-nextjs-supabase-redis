import HeroSection from "./SmallerComponents/HeroSection";
import MustHaves from "./SmallerComponents/MustHaves";
import BestSellers from "./SmallerComponents/BestSellers";
import JustIn from "./SmallerComponents/JustIn";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <MustHaves />
      <BestSellers />
      <JustIn />
    </main>
  );
}

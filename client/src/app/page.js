import LandingPage from "@/components/home/landingpage";
import Potensi from "@/components/home/potensi";
import SplashAnimation from "@/components/home/splashanimation";
import Tentang from "@/components/home/tentang";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <SplashAnimation>
        <Navbar />
        <LandingPage />
        <Tentang />
        <Potensi />
        <Footer />
      </SplashAnimation>
    </main>
  );
}

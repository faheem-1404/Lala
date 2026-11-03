import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { Nav } from "@/components/navigation/Nav";
import { Experience } from "@/components/three/Experience";
import { Story } from "@/components/sections/Story";
import { IntroSection } from "@/components/sections/IntroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EditorialMenu } from "@/components/menu/EditorialMenu";
import { StartHereSection } from "@/components/sections/StartHereSection";
import { FoodSection } from "@/components/sections/FoodSection";
import { VisitSection } from "@/components/sections/VisitSection";
import { BrandSignOff } from "@/components/sections/BrandSignOff";
import { Footer } from "@/components/footer/Footer";
import { Loader } from "@/components/ui/Loader";
import { Cursor } from "@/components/ui/Cursor";

export default function Page() {
  return (
    <ScrollProvider>
      <Loader />
      <Cursor />
      <Nav />
      <Experience />
      <main>
        <Story />
        <IntroSection />
        <ExperienceSection />
        <EditorialMenu />
        <StartHereSection />
        <FoodSection />
        <VisitSection />
        <BrandSignOff />
      </main>
      <Footer />
    </ScrollProvider>
  );
}

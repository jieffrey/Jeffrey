import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import About from "@/modules/about";

export const metadata: Metadata = {
  title: "Jeffrey Studios | About",
  description: "Tentang Jeffrey Kalsah Al Kautsar — Fullstack Developer",
};

const AboutPage = () => {
  return (
    <Container data-aos="fade-up">
      <About />
    </Container>
  );
};

export default AboutPage;
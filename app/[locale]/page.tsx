import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import Home from "@/modules/home/components/home";

export const metadata: Metadata = {
  title: "Jeffrey Studios | Personal Website",
  description: "Fullstack Developer — React, Next.js, React Native, Flutter",
  alternates: {
    canonical: `${process.env.DOMAIN}`,
  },
};

const HomePage = () => {
  return (
    <Container data-aos="fade-up">
      <Home />
    </Container>
  );
};

export default HomePage;
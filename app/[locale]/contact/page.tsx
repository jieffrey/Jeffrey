import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import Contact from "@/modules/contact";

export const metadata: Metadata = {
  title: "Jeffrey Studios | Contact",
  description: "Get in touch with Jeffrey Kalsah Al Kautsar",
};

const ContactPage = () => {
  return (
    <Container data-aos="fade-up">
      <Contact />
    </Container>
  );
};

export default ContactPage;
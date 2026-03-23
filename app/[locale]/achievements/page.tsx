import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import Achievements from "@/modules/achievments"

export const metadata: Metadata = {
  title: "Jeffrey Studios | Achievements",
  description: "Sertifikat dan pencapaian Jeffrey Kalsah Al Kautsar",
};

const AchievementsPage = () => {
  return (
    <Container data-aos="fade-up">
      <Achievements />
    </Container>
  );
};

export default AchievementsPage;
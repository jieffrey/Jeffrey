import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import Projects from "@/modules/projects";

export const metadata: Metadata = {
  title: "Jeffrey Studios | Projects",
  description: "Project mini yang pernah gua bangun dan deploy.",
};

const ProjectsPage = () => {
  return (
    <Container data-aos="fade-up">
      <Projects />
    </Container>
  );
};

export default ProjectsPage;
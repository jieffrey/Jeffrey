import Breakline from "@/common/components/elements/Breakline";
import Introduction from "./Introduction";
import SkillList from "./SkillList";
import QuickContact from "./Quickcontact";

const Home = () => {
  return (
    <>
      <Introduction />
      <Breakline className="my-8" />
      <SkillList />
      <Breakline className="my-8" />
      <QuickContact />
    </>
  );
};

export default Home;
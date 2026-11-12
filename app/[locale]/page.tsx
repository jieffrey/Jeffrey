import { setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import TheLine from "@/modules/line/components/TheLine";
import Now from "@/modules/now/components/Now";
import Work from "@/modules/work/components/Work";
import About from "@/modules/about/components/About";
import StackOrbit from "@/modules/stack/components/StackOrbit";
import Cabinet from "@/modules/cabinet/components/Cabinet";
import Contact from "@/modules/contact/components/Contact";
import { getGithub } from "@/lib/data/github";
import { getSpotify } from "@/lib/data/spotify";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [github, spotify] = await Promise.all([getGithub(), getSpotify()]);

  return (
    <>
      <TheLine />
      <Now github={github} spotify={spotify} />
      <Work />
      <About />
      <StackOrbit />
      <Cabinet />
      <Contact />
    </>
  );
}

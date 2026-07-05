import OverviewCard from "../cards/OverviewCard";
import GithubProfileCard from "../cards/GithubProfileCard";
import ContributionCard from "../cards/ContributionCard";
import { overview } from "../../data/overview";

export default function DashboardGrid() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-4">
        {overview.map((item) => (
          <OverviewCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ContributionCard />
        <GithubProfileCard />
      </div>
    </div>
  );
}

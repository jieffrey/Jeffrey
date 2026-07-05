import { DeveloperOverviewWidget } from "../widgets/DeveloperOverview";
import { GithubWidget, GithubContributionWidget } from "../widgets/Github";
import { RepositoriesWidget } from "../widgets/Repositories";
import { WakatimeWidget } from "../widgets/Wakatime";
import { MissionWidget } from "../widgets/Mission";
import { SpotifyWidget } from "../widgets/Spotify";
import { MonkeytypeWidget } from "../widgets/Monkeytype";
import { VisitorsWidget } from "../widgets/Visitors";
import { UmamiWidget } from "../widgets/Umami";

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
      <div className="md:col-span-full lg:col-span-12">
        <DeveloperOverviewWidget index={0} />
      </div>

      <div className="lg:col-span-4">
        <GithubWidget index={1} />
      </div>

      <div className="lg:col-span-8">
        <GithubContributionWidget index={2} />
      </div>

      <div className="lg:col-span-6">
        <RepositoriesWidget index={3} />
      </div>

      <div className="lg:col-span-6">
        <WakatimeWidget index={4} />
      </div>

      <div className="lg:col-span-6">
        <MissionWidget index={5} />
      </div>

      <div className="lg:col-span-6">
        <SpotifyWidget index={6} />
      </div>

      <div className="lg:col-span-6">
        <MonkeytypeWidget index={7} />
      </div>

      <div className="lg:col-span-6">
        <VisitorsWidget index={8} />
      </div>

      <div className="md:col-span-full lg:col-span-12">
        <UmamiWidget index={9} />
      </div>
    </div>
  );
}

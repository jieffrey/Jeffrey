import GithubProfileWidget from "../widgets/Github/GithubProfileWidget";
import GithubContributionWidget from "../widgets/Github/GithubContributionWidget";
import SpotifyWidget from "../widgets/Spotify/SpotifyWidget";

interface DashboardGridProps {
  loading?: boolean;
}

export default function DashboardGrid({ loading = false }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {/* profile: left column, top row */}
      <div>
        <GithubProfileWidget index={0} loading={loading} />
      </div>

      {/* contributions: right column, top row — grid row-stretch
          (the default `align-items: stretch`) makes this match the
          profile card's height automatically since they share a row */}
      <div>
        <GithubContributionWidget index={1} loading={loading} />
      </div>

      {/* spotify: full width, bottom row */}
      <div className="md:col-span-2">
        <SpotifyWidget index={2} loading={loading} />
      </div>
    </div>
  );
}
import { Github, Star, Users, GitFork } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { github } from "../data/mock";

export default function GithubProfileCard() {
  return (
    <DashboardCard
      title="GitHub"
      subtitle="Developer Profile"
      icon={<Github size={20} />}
    >
      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-zinc-500 text-sm">Repositories</p>
          <h2 className="text-3xl font-bold">
            {github.repositories}
          </h2>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Followers</p>
          <h2 className="text-3xl font-bold">
            {github.followers}
          </h2>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Following</p>
          <h2 className="text-2xl font-semibold">
            {github.following}
          </h2>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Commits</p>
          <h2 className="text-2xl font-semibold">
            {github.commits}
          </h2>
        </div>

      </div>
    </DashboardCard>
  );
}
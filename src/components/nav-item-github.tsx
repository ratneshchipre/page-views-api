import { getGitHubStargazerCount } from "@/data/github-stargazers";

import { SOURCE_CODE_GITHUB_REPO } from "@/config/site";
import GitHubStars from "@/components/github-stars";

export default async function NavItemGitHub() {
  const stargazersCount = await getGitHubStargazerCount();

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  );
}

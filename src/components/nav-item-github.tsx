import GitHubStars from "@/components/github-stars";
import { SOURCE_CODE_GITHUB_REPO } from "@/config/site";
import { getGitHubStargazerCount } from "@/data/github-stargazers";

export default async function NavItemGitHub() {
  const stargazersCount = await getGitHubStargazerCount();

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  );
}

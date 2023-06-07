import { RepositoriesList } from "../types/repositoriesList";

export const calculateRepoStatistics = (repoList: RepositoriesList[]) => {
  let stars = 0;
  let commits = 0;
  let forks = 0;

  for (const repo of repoList) {
    stars += repo.totalStars;
    commits += repo.totalComits;
    forks += repo.totalForks;
  };

  return {
    stars,
    commits,
    forks,
  }
}
import { getTotalCommits } from "./getTotalCommits";

const axios = require('axios');

export const getAllRepositories = async(username: string, accessToken: string) => {
  try {
    const perPage = 100;
    let page = 1;
    let repositoriesList = [];

    while (true) {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const repositoriesData = response.data;

      if (repositoriesData.length === 0) {
        break;
      }

      for (const repo of repositoriesData) {
        const totalComits = await getTotalCommits(username, repo.name, accessToken);
        const totalForks = repo.forks_count;
        const totalStars = repo.stargazers_count;

        const repository = {
          repositoryName: repo.name,
          totalComits,
          totalForks,
          totalStars
        };

        repositoriesList.push(repository);
      }

      page++;
    }

    return repositoriesList;
  } catch {
    console.log('Failed to fetch repositories data');
  }
}

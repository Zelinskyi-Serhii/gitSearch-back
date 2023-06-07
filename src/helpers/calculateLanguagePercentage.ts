import { LanguagesData } from "../types/languagesData";
import { LanguagesStatistic } from "../types/languagesStatistic";
import { RepositoriesList } from "../types/repositoriesList";
import { getRepositoryLanguages } from "./getRepositoryLanguages";

export const calculateLanguagePercentage = async(repositoriesList: RepositoriesList[], accessToken: string, userName: string) => {
  const languagesData: LanguagesData = {};

  for (const repository of repositoriesList) {
    const repositoryLanguages = await getRepositoryLanguages(userName, repository.repositoryName, accessToken);

    for (const language in repositoryLanguages) {
      if (languagesData[language]) {
        languagesData[language] += repositoryLanguages[language];
      } else {
        languagesData[language] = repositoryLanguages[language];
      }
    }
  }

  const totalBytes = Object.values(languagesData).reduce((sum, bytes) => sum + bytes, 0);
  const languageStatistics: LanguagesStatistic = {};

  for (const language in languagesData) {
    const bytes = languagesData[language];
    const percentage = ((bytes / totalBytes) * 100).toFixed(2);

    languageStatistics[language] = `${percentage}%`;
  }

  return languageStatistics;
}
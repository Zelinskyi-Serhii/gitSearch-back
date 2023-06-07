'use strict';

const axios = require('axios');
import { calculateLanguagePercentage } from "../helpers/calculateLanguagePercentage";
import { calculateRepoStatistics } from "../helpers/calculateRepoStatistics";
import { formatDate } from "../helpers/formatedDate";
import { getAllRepositories } from "../helpers/getAllRepositories";

const getAllInformation = async (username: string, accessToken: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userData = response.data;

    const nickname = userData.login;
    const created_at = userData.created_at;
    const totalPublicRepositories = userData.public_repos;

    const repositoriesList = await getAllRepositories(username, accessToken);
    const languageStatistics = await calculateLanguagePercentage(repositoriesList, accessToken, username);
    const totalStatistics = calculateRepoStatistics(repositoriesList);

    const userObject = {
      nickname,
      created_at,
      totalPublicRepositories,
      languageStatistics,
      repositoriesList,
      totalStatistics,
    };

    return userObject;
  } catch {
    console.log('Failed to fetch repositories data');
  }
}

const getShortInfoByNickName = async (username: string, accessToken: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      
    });

    const userData = response.data;
    const nickname = userData.login;
    const created_at = formatDate(userData.created_at);
    const totalPublicRepositories = userData.public_repos;

    const userObject = {
      nickname,
      created_at,
      totalPublicRepositories,
    };

    return userObject;
  } catch {
    console.log('Failed to fetch user data');
  }
}

export default {
  getAllInformation,
  getShortInfoByNickName,
};

const axios = require('axios');

export const getTotalCommits = async(username: string, repository: string, accessToken: string) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repository}/commits`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const commitsData = response.data;

    return commitsData.length;
  } catch {
    console.log('Failed to fetch repositories data');
  }
};

const axios = require('axios');

export const getRepositoryLanguages = async(username: string, repository: string, accessToken: string) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repository}/languages`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch {
    console.log('Failed to fetch repositories data');
  }
}
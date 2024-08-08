{
    const axios = require('axios');

    const getLatestCommit = async (user, repo, committer) => {
      const GITHUB_API_URL = `https://api.github.com/repos/${user}/${repo}/commits`;
    
      try {
        const response = await axios.get(GITHUB_API_URL);
        const commits = response.data;
    
        for (const commitData of commits) {
          const commit = commitData.commit;
          if (commit.committer.name === committer) {
            const latestCommit = {
              sha: commitData.sha,
              commit_timestamp: commit.committer.date,
              committer: committer,
            };
            return latestCommit;
          }
        }
        return null;
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };
    
    const user = 'ardalis'; // Replace with the GitHub username
    const repo = 'CleanArchitecture'; // Replace with the repository name
    const committer = 'ardalis'; // Replace with the committer name
    
    getLatestCommit(user, repo, committer)
      .then((latestCommit) => {
        if (latestCommit) {
          console.log(JSON.stringify(latestCommit, null, 2));
        } else {
          console.log('No commits found for the specified committer.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
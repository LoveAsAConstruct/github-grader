import { fetchRepoData, fetchRepoDetails, fetchCommits } from '$lib/github.js';

export async function GET({ url, cookies }) {
  const username = url.searchParams.get('username');
  const token = cookies.get('github_token');
  console.log('Fetching repos for username:', username);
  console.log('Using token:', token);

  if (!username || !token) {
    return new Response(JSON.stringify({ error: 'Username and token are required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const repos = await fetchRepoData(username, token);
    console.log('Fetched repos:', repos);

    const repoDetails = await Promise.all(
      repos.map(async (repo) => {
        const details = await fetchRepoDetails(username, repo.name, token);
        const commits = await fetchCommits(username, repo.name, token);
        return {
          name: repo.name,
          stars_count: details.stargazers_count,
          forks_count: details.forks_count,
          commits_count: commits.length,
          size: details.size,
        };
      })
    );

    console.log('Repo details:', repoDetails);

    return new Response(JSON.stringify(repoDetails), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching repo data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

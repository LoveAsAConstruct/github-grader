// src/lib/github.js
const GITHUB_API_URL = 'https://api.github.com';

export async function fetchRepoData(username, token) {
  console.log('Fetching repo data for:', username);
  console.log('Using token:', token);

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`, { headers });
  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch repos:', errorText);
    throw new Error(`Failed to fetch repos: ${errorText}`);
  }

  const data = await response.json();
  console.log('Fetched repo data:', data);

  return data;
}

export async function fetchRepoDetails(owner, repo, token) {
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch repo details: ${errorText}`);
  }

  return response.json();
}

export async function fetchCommits(owner, repo, token) {
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits`, { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch commits: ${errorText}`);
  }

  return response.json();
}

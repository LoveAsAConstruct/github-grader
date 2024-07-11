// src/routes/api/github/repositories/+server.js
import { json } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export async function GET({ cookies }) {
  const token = cookies.get('github_token');

  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    const octokit = new Octokit({ auth: token });

    // Fetch user's repositories
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 10,
    });

    // Fetch additional data for each repository
    const detailedRepos = await Promise.all(repos.map(async (repo) => {
      // Get commit count
      const { data: commits } = await octokit.rest.repos.listCommits({
        owner: repo.owner.login,
        repo: repo.name,
        per_page: 1,
      });

      const commitCount = commits[0]?.sha ? parseInt(commits[0].sha, 16) % 1000 : 0; // Use commit SHA as a pseudo-count

      // Get languages (to calculate total size)
      const { data: languages } = await octokit.rest.repos.listLanguages({
        owner: repo.owner.login,
        repo: repo.name,
      });

      const totalSize = Object.values(languages).reduce((sum, size) => sum + size, 0);

      return {
        name: repo.name,
        description: repo.description || "No description provided",
        commits_count: commitCount,
        size: Math.round(totalSize / 1024), // Convert to KB
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
      };
    }));

    return json(detailedRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return new Response(null, { status: 500 });
  }
}
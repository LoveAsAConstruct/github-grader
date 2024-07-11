// src/routes/api/github/daily-activity/+server.js
import { json } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export async function GET({ cookies }) {
  const token = cookies.get('github_token');

  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    const octokit = new Octokit({ auth: token });
    const today = new Date().toISOString().split('T')[0];

    // First, get the authenticated user's information
    const { data: user } = await octokit.rest.users.getAuthenticated();

    // Now use the user's login in the commit search
    const { data: commits } = await octokit.rest.search.commits({
      q: `author-date:${today} author:${user.login}`,
      sort: 'author-date',
      order: 'desc',
      per_page: 100
    });

    let totalCommits = commits.total_count;
    let totalLinesAdded = 0;
    let totalLinesRemoved = 0;
    let totalFileSize = 0;

    // Process each commit to get detailed stats
    for (const item of commits.items) {
      const { data: commitData } = await octokit.rest.repos.getCommit({
        owner: item.repository.owner.login,
        repo: item.repository.name,
        ref: item.sha
      });

      totalLinesAdded += commitData.stats.additions;
      totalLinesRemoved += commitData.stats.deletions;
      totalFileSize += commitData.files.reduce((sum, file) => sum + file.changes, 0);
    }

    return json({
      commits: totalCommits,
      linesOfCode: totalLinesAdded + totalLinesRemoved,
      fileSize: totalFileSize
    });
  } catch (error) {
    console.error('Error fetching daily activity:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
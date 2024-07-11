// src/routes/api/github/daily-activity/+server.js
import { json } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export async function GET({ cookies }) {
  const token = cookies.get('github_token');

  if (!token) {
    console.log('No GitHub token found in cookies');
    return new Response(null, { status: 401 });
  }

  try {
    const octokit = new Octokit({ auth: token });
    const today = new Date().toISOString().split('T')[0];

    // Get the authenticated user's information
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log('Authenticated user:', user.login);

    // Search for today's commits
    const { data: commits } = await octokit.rest.search.commits({
      q: `author-date:${today} author:${user.login}`,
      sort: 'author-date',
      order: 'desc',
      per_page: 100
    });

    console.log('Commits found:', commits.total_count);

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

    console.log('Total lines added:', totalLinesAdded);
    console.log('Total lines removed:', totalLinesRemoved);
    console.log('Total file size changes:', totalFileSize);

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
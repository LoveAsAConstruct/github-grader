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
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 10,
    });

    return json(repos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return new Response(null, { status: 500 });
  }
}
// src/routes/api/auth/callback/+server.js
import { redirect } from '@sveltejs/kit';
import { Octokit } from 'octokit';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export async function GET({ url, cookies }) {
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    console.error('GitHub credentials are not properly configured');
    throw new Error('GitHub credentials are not configured');
  }

  const code = url.searchParams.get('code');

  if (!code) {
    throw redirect(302, '/');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const { access_token } = await tokenResponse.json();

    if (!access_token) {
      throw new Error('Failed to obtain access token');
    }

    const octokit = new Octokit({ auth: access_token });
    const { data: user } = await octokit.rest.users.getAuthenticated();

    // Store user info in a secure, HTTP-only cookie
    cookies.set('github_user', JSON.stringify(user), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    cookies.set('github_token', access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    throw redirect(302, '/dashboard');
  } catch (error) {
    console.error('Authentication error:', error);
    throw redirect(302, '/');
  }
}
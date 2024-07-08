// src/routes/api/auth/github/+server.js
import { redirect } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID } from '$env/static/private';

const REDIRECT_URI = 'http://localhost:5173/api/auth/callback';

export function GET() {
  if (!GITHUB_CLIENT_ID) {
    console.error('GITHUB_CLIENT_ID is not defined');
    throw new Error('GitHub Client ID is not configured');
  }
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  throw redirect(302, authUrl);
}
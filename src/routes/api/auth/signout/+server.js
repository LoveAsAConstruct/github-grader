// src/routes/api/auth/signout/+server.js
import { redirect } from '@sveltejs/kit';

export function POST({ cookies }) {
  cookies.delete('github_user', { path: '/' });
  cookies.delete('github_token', { path: '/' });
  return new Response(null, { status: 200 });
}
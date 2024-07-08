// src/routes/api/auth/user/+server.js
import { json } from '@sveltejs/kit';

export function GET({ cookies }) {
  const userCookie = cookies.get('github_user');
  
  if (!userCookie) {
    return new Response(null, { status: 401 });
  }

  const user = JSON.parse(userCookie);
  return json(user);
}
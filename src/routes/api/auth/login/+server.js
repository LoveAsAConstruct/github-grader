import { GITHUB_CLIENT_ID } from '$env/static/private';

export async function GET() {
  console.log('Redirecting to GitHub for OAuth');
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUri
    }
  });
}

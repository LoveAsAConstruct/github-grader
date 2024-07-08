import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export async function GET({ url }) {
  const code = url.searchParams.get('code');
  console.log('Received code from GitHub:', code);

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await response.json();
  console.log('Response from GitHub:', data);

  const { access_token } = data;
  console.log('Access token:', access_token);

  if (!access_token) {
    return new Response(JSON.stringify({ error: 'Failed to get access token' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': `github_token=${access_token}; Path=/; HttpOnly`,
      Location: '/'
    }
  });
}

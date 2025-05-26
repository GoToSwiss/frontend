const googleClientId = import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID;
const googleRedirectUrl = import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI;
const googleScope = 'email profile';

const params = new URLSearchParams({
  response_type: 'code',
  client_id: googleClientId,
  redirect_uri: googleRedirectUrl,
  scope: googleScope,
});
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

export default googleAuthUrl;

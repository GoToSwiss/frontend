/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_MAP_API: string;
  readonly VITE_APP_GOOGLE_AUTH_CLIENT_ID: string;
  readonly VITE_APP_GOOGLE_AUTH_REDIRECT_URI: string;
  readonly VITE_BACK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

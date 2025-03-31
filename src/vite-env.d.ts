/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_MAP_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

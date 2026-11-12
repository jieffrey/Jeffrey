// TODO(kalsah): set DOMAIN in the deployment env (e.g. https://your-domain.dev).
export const SITE_URL = process.env.DOMAIN ?? "http://localhost:3000";

export const OG_LOCALES = { en: "en_US", id: "id_ID" } as const;

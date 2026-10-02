// NEXT_PUBLIC_* values are embedded at build time; rebuild after changing this.
export const ELARA_API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://elara.arifian.dev").replace(/\/+$/, "");

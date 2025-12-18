import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.url(),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: z.string(),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: process.env as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});

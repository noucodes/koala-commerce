import path from "path";
import { fileURLToPath } from "url";
import { env } from "../env.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generated = path.join(__dirname, "generated/");
export const documents = path.join(__dirname, "graphql/**/*.tsx");

export const endpoint = `${env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;
export const accessToken = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN as string;

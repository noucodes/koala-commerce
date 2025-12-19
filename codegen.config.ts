import { CodegenConfig } from "@graphql-codegen/cli";
import { env } from "./src/lib/env.ts";

export const storefrontEndpoint = `${env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  documents: ["./src/**/*.{ts,tsx}"],
  schema: {
    [storefrontEndpoint]: {
      headers: {
        "X-Shopify-Storefront-Access-Token": env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
      },
    },
  },
  generates: {
    ["./src/lib/storefront/graphql/"]: {
      preset: "client",
    },
    "./src/lib/storefront/graphql/schema.gql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;

import { CodegenConfig } from "@graphql-codegen/cli";
import { getPublicTokenHeaders, getStorefrontApiUrl } from "./src/lib/storefront/index.ts";

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  documents: ["./src/**/*.{ts,tsx}"],
  schema: {
    [getStorefrontApiUrl()]: {
      headers: getPublicTokenHeaders(),
    },
  },
  generates: {
    ["./src/lib/storefront/graphql/"]: {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
    "./src/lib/storefront/graphql/schema.gql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;

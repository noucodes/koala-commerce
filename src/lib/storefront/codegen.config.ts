import { CodegenConfig } from "@graphql-codegen/cli";
import { endpoint, accessToken, documents, generated } from "./shared.config.ts";

const config: CodegenConfig = {
  schema: {
    [endpoint]: {
      headers: {
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
    },
  },
  watch: true,
  overwrite: true,
  ignoreNoDocuments: true,
  documents: [documents],
  generates: {
    [generated]: {
      preset: "client",
    },
  },
};

export default config;

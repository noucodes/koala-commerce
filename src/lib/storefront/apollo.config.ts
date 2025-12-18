import { endpoint, accessToken, documents, generated } from "./shared.config.ts";

const config = {
  client: {
    service: {
      url: endpoint,
      name: "Shopify Storefront",
      headers: { "X-Shopify-Storefront-Access-Token": accessToken },
    },
    includes: [documents],
    excludes: [generated],
  },
};

export default config;

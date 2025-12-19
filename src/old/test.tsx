import { graphql, storefrontClient } from "@/lib/storefront";

const shopQuery = graphql(`
  query Shop {
    shop {
      name
    }
  }
`);

const r = await storefrontClient(shopQuery);

const name = r.data?.shop.name;

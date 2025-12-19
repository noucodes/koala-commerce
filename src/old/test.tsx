import { graphql, storefront } from "@/lib/storefront";

const shopQuery = graphql(`
  query Shop {
    shop {
      name
    }
  }
`);

const r = await storefront.query(shopQuery);

const name = r.data?.shop.name;

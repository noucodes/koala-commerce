import { graphql } from "../generated";

export const shop = graphql(`
  query shop {
    shop {
      name
    }
  }
`);

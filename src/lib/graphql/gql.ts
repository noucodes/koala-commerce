/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query ProductList($first: Int!, $after: String) {\n      products(first: $first, after: $after) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            handle\n            title\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            featuredImage {\n              url(transform: { maxWidth: 500 })\n              altText\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  ": typeof types.ProductListDocument,
    "\n  query Shop {\n    shop {\n      name\n    }\n  }\n": typeof types.ShopDocument,
};
const documents: Documents = {
    "\n    query ProductList($first: Int!, $after: String) {\n      products(first: $first, after: $after) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            handle\n            title\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            featuredImage {\n              url(transform: { maxWidth: 500 })\n              altText\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  ": types.ProductListDocument,
    "\n  query Shop {\n    shop {\n      name\n    }\n  }\n": types.ShopDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProductList($first: Int!, $after: String) {\n      products(first: $first, after: $after) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            handle\n            title\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            featuredImage {\n              url(transform: { maxWidth: 500 })\n              altText\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  "): typeof import('./graphql').ProductListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Shop {\n    shop {\n      name\n    }\n  }\n"): typeof import('./graphql').ShopDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

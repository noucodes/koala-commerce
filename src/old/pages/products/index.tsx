import type { PageProps } from "@/old/utilities/deps";

import { StoreLayout } from "@/old/layouts/store-layout";
import { fetchProductListSection, ProductListSection } from "@/old/sections/product-list-section";
import { fetchServerSideProps, NextSeo } from "@/old/utilities/deps";

export const getStaticProps = fetchServerSideProps(async () => {
  return {
    props: {
      data: {
        productListSection: await fetchProductListSection(),
      },
    },
    revalidate: 60,
  };
});

export default function Page(props: PageProps<typeof getStaticProps>) {
  return (
    <StoreLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductListSection data={props.data.productListSection} />
    </StoreLayout>
  );
}

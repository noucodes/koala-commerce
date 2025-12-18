import type { PageProps } from "@/utilities/deps";

import { StoreLayout } from "@/layouts/store-layout";
import { fetchProductListSection, ProductListSection } from "@/sections/product-list-section";
import { fetchServerSideProps, NextSeo } from "@/utilities/deps";

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

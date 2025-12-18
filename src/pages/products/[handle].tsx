import type { PageProps } from "@/utilities/deps";

import { StoreLayout } from "@/layouts/store-layout";
import { fetchProductSingleSection, ProductSingleSection } from "@/sections/prouct-single-section";
import { fetchStaticPaths, fetchStaticProps, invariant, NextSeo } from "@/utilities/deps";

export const getStaticPaths = fetchStaticPaths(async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
});

export const getStaticProps = fetchStaticProps(async ({ params }) => {
  invariant(typeof params?.handle === "string", `params.handle is required`);

  return {
    props: {
      data: {
        productSingleSection: await fetchProductSingleSection(params?.handle),
      },
    },
    revalidate: 60,
  };
});

export default function Page(props: PageProps<typeof getStaticProps>) {
  const { seo } = props.data.productSingleSection;

  return (
    <StoreLayout>
      <NextSeo title={seo.title} description={seo.description} />
      <ProductSingleSection data={props.data.productSingleSection} />
    </StoreLayout>
  );
}

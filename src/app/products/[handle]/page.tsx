import { Metadata } from "next";
import { ProductSingle } from "./product-single";
import { getProduct } from "./utils";

export const revalidate = 3600; // Product is fresh for one hour max

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

export default async function Page({ params }: Props) {
  const { handle } = await params;
  const data = await getProduct(handle);

  return <ProductSingle data={data} />;
}

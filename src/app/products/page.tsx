import { Metadata } from "next";
import { ProductList } from "./product-list";
import { getProductList } from "./services";

export const metadata: Metadata = {
  title: "Products",
  description: "All products on the store",
};

export default async function Page() {
  const data = await getProductList();

  return <ProductList data={data} />;
}

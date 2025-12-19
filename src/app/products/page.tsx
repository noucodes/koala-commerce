import { ProductList } from "./product-list";
import { getProductList } from "./utils";

export default async function Page() {
  const data = await getProductList();

  return <ProductList data={data} />;
}

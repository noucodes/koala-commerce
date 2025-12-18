import { StoreLayout } from "@/layouts/store-layout";
import { CartSection } from "@/sections/cart-section";
import { NextSeo } from "@/utilities/deps";

export default function Page() {
  return (
    <StoreLayout>
      <NextSeo title="Cart" />
      <CartSection />
    </StoreLayout>
  );
}

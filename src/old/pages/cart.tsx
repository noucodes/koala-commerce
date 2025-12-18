import { StoreLayout } from "@/old/layouts/store-layout";
import { CartSection } from "@/old/sections/cart-section";
import { NextSeo } from "@/old/utilities/deps";

export default function Page() {
  return (
    <StoreLayout>
      <NextSeo title="Cart" />
      <CartSection />
    </StoreLayout>
  );
}

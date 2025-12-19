import type { Metadata } from "next";
import { ReactNode } from "react";
import { Header } from "./header";
import { CartProvider, ShopifyProvider } from "@/lib/hydrogen";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next Shopify Storefront",
    template: "%s • Next Shopify Storefront",
  },
  description:
    "A modern Shopping Cart built with ESMate , ShadCN , Next.js , React.js , ESLint , Prettier , GraphQL, and Shopify Hydrogen.",
};

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <html lang="en" className="light">
      <body>
        <ShopifyProvider
          languageIsoCode="EN"
          countryIsoCode="US"
          storeDomain={env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
          storefrontToken={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN}
          storefrontApiVersion={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}
        >
          <CartProvider>
            {/* <ProgressBar color="orange" /> */}
            <Header />
            <main className="mx-auto max-w-7xl p-6 lg:px-8">{props.children}</main>
          </CartProvider>
        </ShopifyProvider>
      </body>
    </html>
  );
}

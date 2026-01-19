"use client";
import { Money } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardFooter, CardHeader } from "@esmate/shadcn/components/ui/card";
import { Loader2, Search } from "@esmate/shadcn/pkgs/lucide-react";
import { useState } from "react";
import { getProductList } from "./service";
import { useRequest } from "@esmate/react/ahooks";
import { titleize } from "@esmate/utils/string";
import { useSearchParams } from 'next/navigation';

interface Props {
  data: Awaited<ReturnType<typeof getProductList>>;
}

export function ProductList(props: Props) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [pages, setPages] = useState([props.data]);
  const lastPage = pages[pages.length - 1];
  const lastCursor = lastPage.edges[lastPage.edges.length - 1].cursor;
  const hasNextPage = lastPage.pageInfo.hasNextPage;

  const request = useRequest(
    async () => {
      setPages([...pages, await getProductList(lastCursor)]);
    },
    {
      manual: true,
    },
  );

  return (
    <> 
    {/* Hero Section*/}
      <section className="relative w-full h-96 bg-gradient-to-br from-primary/20 via-secondary to-accent/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 px-4">
            <h1 className="text-8xl md:text-9xl font-black text-primary/20 absolute inset-0 flex items-center justify-center">
              Shop
            </h1>
            <div className="relative z-20">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Give All You Need</h2>
              <div className="flex gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/50" />
                  <input
                    type="text"
                    placeholder="Search our mattresses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="bg-foreground text-background hover:bg-foreground/90 px-6">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-6">
        <h1 className="sr-only">Products</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pages
            .flatMap(({ edges }) => edges)
            .map(({ node }) => (
              <Link key={node.handle} href={`/products/${node.handle}`} className="group flex">
                <Card className="flex w-full flex-col overflow-hidden pt-0">
                  <CardHeader className="m-0 p-0">
                    <Image
                      src={node.featuredImage!.url as string}
                      alt={node.featuredImage!.altText || ""}
                      height={node.featuredImage!.height as number}
                      width={node.featuredImage!.width as number}
                      loading="eager"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </CardHeader>
                  <CardFooter className="mt-auto flex flex-col items-start justify-center gap-2">
                    <h3 className="text-md font-bold">{titleize(node.title)}</h3>
                    <Money className="text-sm" data={node.priceRange.minVariantPrice} />
                  </CardFooter>
                </Card>
              </Link>
            ))}
        </div>
        {hasNextPage && (
          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              variant={request.error ? "destructive" : "default"}
              onClick={request.run}
              disabled={request.loading}
              className="min-w-50"
            >
              {request.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {request.loading ? "Loading..." : request.error ? "Try Again" : "Load More Products"}
            </Button>
          </div>
        )}
      </section>
    </>
  );
  
}

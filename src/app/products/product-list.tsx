"use client";
import { Money } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardFooter, CardHeader } from "@esmate/shadcn/components/ui/card";
import { Loader2, Search } from "@esmate/shadcn/pkgs/lucide-react";
import { useState, useRef, useEffect } from 'react';
import { getProductList } from "./service";
import { useRequest } from "@esmate/react/ahooks";
import { titleize } from "@esmate/utils/string";
import { useSearchParams } from 'next/navigation';
import { CardDescription } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface Props {
  data: Awaited<ReturnType<typeof getProductList>>;
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

function ScrollFadeIn({ children, delay = 0, direction = 'up', className }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translateX(0) translateY(0)';
    switch (direction) {
      case 'left':
        return 'translateX(-40px)';
      case 'right':
        return 'translateX(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'up':
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
      }}
    >
      {children}
    </div>
  );
}

const categories = ['All Product', 'Memory Foam', 'Hybrid', 'Latex'];
const filterOptions = ['New Arrival', 'Best Seller', 'On Discount'];

export function ProductList(props: Props) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Product');
  const [openFilter, setOpenFilter] = useState<string | null>(null);
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
        <div className="flex gap-8">
            {/* Sidebar Filters */}
            <ScrollFadeIn direction="left" className="hidden lg:block">
              <div className="w-64 flex-shrink-0">
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-6">Category</h3>
                  
                  {/* All Product */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-5 rounded border-2 border-primary/50 flex items-center justify-center text-sm">
                        📦
                      </div>
                      <button
                        onClick={() => setSelectedCategory('All Product')}
                        className="font-medium text-foreground hover:text-primary transition-colors text-sm flex-1 text-left"
                      >
                        All Product
                      </button>
                      <button className="p-1">
                        <ChevronDown className="w-4 h-4 text-foreground/50" />
                      </button>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3 mb-8">
                    {categories.slice(1).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-foreground/70 hover:text-foreground'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Filter Options */}
                  {filterOptions.map((filter) => (
                    <div key={filter} className="mb-4 pb-4 border-b border-border last:border-b-0">
                      <button
                        onClick={() => setOpenFilter(openFilter === filter ? null : filter)}
                        className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {filter}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openFilter === filter ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openFilter === filter && (
                        <div className="mt-3 space-y-2">
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span className="text-foreground/70">Option 1</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span className="text-foreground/70">Option 2</span>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </Card>
              </div>
            </ScrollFadeIn>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pages
            .flatMap(({ edges }) => edges)
            .map(({ node }) => (
              <Link key={node.handle} href={`/products/${node.handle}`} className="group flex">
                <Card className="flex w-full flex-col overflow-hidden pt-0 border-none shadow-none gap-2">
                  <CardHeader className="m-0 p-0">
                    <Image
                      src={node.featuredImage!.url as string}
                      alt={node.featuredImage!.altText || ""}
                      height={node.featuredImage!.height as number}
                      width={node.featuredImage!.width as number}
                      loading="eager"
                      className="h-full w-full object-cover transition-transform duration-300 rounded-xl"
                    />
                  </CardHeader>
                  <CardDescription>
                    <h3 className="text-2xl font-bold">{titleize(node.title)}</h3>
                    <Money className="text-sm" data={node.priceRange.minVariantPrice} />
                  </CardDescription>
                  <CardFooter className="mt-0 grid grid-cols-2 gap-2 p-0">
                    <Button variant="outline" className="w-full">Add to Cart</Button>
                    <Button className="w-full">Buy Now</Button>
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
        </div>
      </section>
    </>
  );
  
}

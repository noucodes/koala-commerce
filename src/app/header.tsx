"use client";

import { useCart } from "@shopify/hydrogen-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, ShoppingCart } from "@esmate/shadcn/pkgs/lucide-react";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@esmate/shadcn/components/ui/sheet";
import { Badge } from "@esmate/shadcn/components/ui/badge";
import Image from 'next/image'


const mainMenuItems: { text: string; href: string }[] = [
  {
    text: "Mattresses",
    href: "/#mattresses",
  },
  {
    text: "Sizes",
    href: "/#sizes",
  },
  {
    text: "Why Koala",
    href: "/#why",
  },
  {
    text: "FAQ",
    href: "/#faq",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalQuantity } = useCart();

  function isMenuItemActive(href: string) {
    const url = new URL(`https://x${href}`);
    return pathname.startsWith(url.pathname);
  }

  return (
    <header className="fixed z-50 top-0 left-0 w-full border-b backdrop-blur-md">
      <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center lg:px-8" aria-label="Global">
        <div className="hidden lg:flex gap-x-5 justify-start">
          {mainMenuItems.map(({ text, href }) => (
            <Link
              className={`text-sm text-foreground/80 hover:text-foreground transition
              }`}
              key={href}
              href={href}
            >
              {text}
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/" className="">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="Picture of the Koala"
              />
            </div>
          </Link>
        </div>

        <div className="flex justify-end items-center gap-4">
          <Link href="/cart" className="relative">
            <span className="sr-only">Cart</span>
            <ShoppingCart className="h-6 w-6" />
            {!!totalQuantity && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 text-xs font-bold"
              >
                {totalQuantity}
              </Badge>
            )}
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <div className="flex flex-col gap-6 pt-6">
                {mainMenuItems.map(({ text, href }) => (
                  <Link
                    className={`rounded-lg px-3 py-2 text-base font-semibold transition-colors hover:bg-accent ${
                      isMenuItemActive(href) ? "text-primary" : "text-foreground"
                    }`}
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

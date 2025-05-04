"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navbarLinks = [
  {
    title: "Каталог",
    href: "/products",
  },
];

const Navbar = () => {
  return (
    <>
      <Link className="mr-5 hidden items-center gap-2 md:flex" href="/">
        <Image src="/elysia.svg" width={35} height={35} alt={""} />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Elysia</span>
        </div>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navbarLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex gap-2 md:hidden">
            <Button variant="outline" size="icon" className="shrink-0">
              <MenuIcon className="h-5 w-5" />
            </Button>
            <Link className="mr-5 flex items-center gap-2" href="/">
              <Image src="/elysia.svg" width={35} height={35} alt={""} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Elysia</span>
              </div>
            </Link>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-6">
          <nav className="grid gap-6 text-lg font-medium">
            {navbarLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm"
                prefetch={false}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;

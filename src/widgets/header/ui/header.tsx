import { Cart } from "@/feature/cart";
import { buttonVariants } from "@/shared/components/ui/button";
import { GetPayload } from "@/shared/lib/jwt";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Navbar from "./navbar";
import { ThemeBtn } from "./theme-btn";
import { UserDropdown } from "./user-dropdown";

export const Header = async ({ children }: { children?: React.ReactNode }) => {
  const user = await GetPayload();

  return (
    <header className="border-border/40 bg-card/95 supports-[backdrop-filter]:bg-card/60 dark:border-border sticky top-0 z-50 flex h-[calc(var(--spacing)*16)] w-full border-b px-4 py-3 backdrop-blur">
      <Navbar />
      <div className="ml-auto flex items-center justify-end gap-2 md:ml-auto">
        {children}
        <ThemeBtn />
        {user ? (
          <>
            <Cart />
            <UserDropdown />
          </>
        ) : (
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

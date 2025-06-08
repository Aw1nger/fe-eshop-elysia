// (auth)/layout.tsx

import { Header } from "@/widgets/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-svh">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

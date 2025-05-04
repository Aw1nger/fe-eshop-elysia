import { Header } from "@/widgets/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh flex-col">
      <Header />
      <main className="flex flex-grow flex-col">{children}</main>
    </div>
  );
};

export default Layout;

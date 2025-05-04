import { Register } from "@/feature/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация | Elysia",
  description: "Присоединяйтесь к нам!",
};

const Page = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Register />
      </div>
    </div>
  );
};

export default Page;

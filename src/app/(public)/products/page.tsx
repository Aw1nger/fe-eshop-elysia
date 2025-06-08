// (public)/products/[id]/page.tsx

import { Products } from "@/feature/products";

const Page = async () => {
  return (
    <section className="container mx-auto my-4 grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <h3 className="col-span-full text-xl font-bold">Каталог:</h3>
      <Products />
    </section>
  );
};

export default Page;

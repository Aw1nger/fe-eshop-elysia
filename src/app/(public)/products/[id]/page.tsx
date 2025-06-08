import { Product } from "@/feature/product";
import { getProduct } from "@/feature/product/api/product.api";
import { Products } from "@/feature/products";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

async function CheckProduct(id: string) {
  try {
    return await getProduct(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await CheckProduct(id);

  if (!product) {
    return {
      title: "Tовар не найден!",
      description: "Запрашиваемый товар не найден!",
      robots: "noindex",
    };
  }

  return {
    title: `${product.name} | Elysia`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Elysia`,
      description: product.description,
      images: [
        {
          url: product.images[0]?.versions[0].link ?? "",
          alt: product.name,
        },
      ],
      locale: "ru_RU",
      siteName: "Elysia",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Elysia`,
      description: product.description,
      images: [product.images[0]?.versions[0].link ?? ""],
    },
  };
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <>
      <Product id={id} />
      <section className="container mx-auto my-4 grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <h3 className="col-span-full text-xl font-bold">
          {" "}
          Похожие предложения:
        </h3>
        <Products />
      </section>
    </>
  );
};

export default Page;

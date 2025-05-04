"use client";
import { Button } from "@/shared/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";
import Link from "next/link";
import { GetProductOption } from "../api/product.api";

export const Product = ({ id }: { id: string }) => {
  const { data, isPending, error } = useQuery(GetProductOption(id));

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (isPending) {
    return <div className="text-center">Загрузка... </div>;
  }

  return (
    <section className="container mx-auto my-6 grid grid-cols-1 gap-4 px-2 sm:grid-cols-3">
      <div className="sm:col-span-1">
        {data.images[0] ? (
          <div className="bg-muted/60 rounded-lg">
            <picture className="aspect-square overflow-hidden">
              {data.images[0].versions.map((image, index) => (
                <source
                  key={index}
                  srcSet={image.signedUrl}
                  type={`image/${image.format}`}
                />
              ))}
              <img
                className="aspect-square h-full w-full rounded-lg object-contain"
                src={data.images[0].versions[0].signedUrl}
                alt=""
              />
            </picture>
          </div>
        ) : (
          <div className="bg-muted flex aspect-square items-center justify-center rounded-lg">
            <Image />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between sm:col-span-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
          <h2 className="text-xl font-extrabold">{data.price}₽</h2>
          <p className="text-lg">{data.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            <Link
              className="text-gray-700 capitalize underline"
              href={"/user/" + data.user.username}
            >
              {data.user.username}
            </Link>{" "}
            {" | "}В наличии: {data.count}
          </p>
          <Button disabled>В корзину</Button>
        </div>
      </div>
    </section>
  );
};

import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { Image } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { ProductSchema } from "../model/product.schema";

export const ProductCard = (product: z.infer<typeof ProductSchema>) => {
  return (
    <Card className="relative gap-0 overflow-hidden py-0">
      {product.images[0] ? (
        <picture className="aspect-square overflow-hidden">
          {product.images[0].versions.map((image, index) => (
            <source
              key={index}
              srcSet={image.signedUrl}
              type={`image/${image.format}`}
            />
          ))}
          <img
            className="w-full object-contain"
            src={product.images[0].versions[0].signedUrl}
            alt=""
          />
        </picture>
      ) : (
        <div className="bg-muted flex aspect-square items-center justify-center">
          <Image />
        </div>
      )}
      <div className="flex flex-col gap-2 p-2">
        <CardTitle className="text-lg capitalize">{product.name}</CardTitle>
        <p className="text-sm">{product.price}₽</p>
        <Link
          href={"/products/" + product.id}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "hover:bg-primary after:absolute after:inset-0",
          )}
        >
          Перейти
        </Link>
      </div>
    </Card>
  );
};

import { apiHandler } from "@/shared/action/api-handler";
import { deleteAction } from "@/shared/action/delete-action";
import { Button } from "@/shared/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { CartProductSchema } from "../api/cart.api";

export const CartProduct = (product: z.infer<typeof CartProductSchema>) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCart, isPending: deletingCart } = useMutation({
    mutationFn: async () =>
      await apiHandler(() => deleteAction(`/cart/${product.id}`), z.object({})),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Что-то пошло не так!", {
        description: "Технические шоколадки, попробуйте позже",
      });
    },
  });

  return (
    <div className="flex h-24 gap-2 p-4 py-1">
      {product.images ? (
        <picture className="aspect-square overflow-hidden rounded">
          {product.images.versions.map((image, index) => (
            <source
              key={index}
              srcSet={image.link}
              type={`image/${image.format}`}
            />
          ))}
          <img
            className="w-full object-contain"
            src={product.images.versions[0].link}
            alt=""
          />
        </picture>
      ) : (
        <div className="bg-muted flex aspect-square items-center justify-center rounded">
          <Image />
        </div>
      )}
      <div className="flex grow flex-col">
        <h3 className="text-xl font-bold capitalize">{product.name}</h3>
        <p className="text-muted line-clamp-2 text-xs">{product.description}</p>
        <div className="mt-auto flex w-full items-center justify-between">
          <p className="text-sm">{product.price}₽</p>
          <Button
            onClick={() => deleteCart()}
            disabled={deletingCart}
            size="icon"
            variant="destructive"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

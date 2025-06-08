import { buttonVariants } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/shared/components/ui/card";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-screen flex-grow flex-col items-center justify-center">
      <Card className="flex flex-col gap-2 gap-4 p-8">
        <CardContent className="flex justify-center">
          <CircleCheck className="size-20 text-green-500" />
        </CardContent>
        <CardTitle className="!text-center">Товары успешно оплачены</CardTitle>
        <CardFooter className="flex justify-center">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            На главную!
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

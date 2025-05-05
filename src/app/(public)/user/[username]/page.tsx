import { getUser } from "@/entities/user/api/user.api";
import { CreateProducts } from "@/feature/create-products";
import { User } from "@/feature/user";
import { UserProducts } from "@/feature/user-products";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { GetPayload } from "@/shared/lib/jwt";
import { TicketPlus } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ username: string }>;
};

async function CheckUser(username: string) {
  try {
    return await getUser(username);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const user = await CheckUser(username);

  if (!user) {
    return {
      title: "Пользователь не найден!",
      description: "Запрашиваемый пользователь не найден!",
      robots: "noindex",
    };
  }

  return {
    title: `${username} | Elysia`,
    description: `Профиль пользователся ${username}`,
    openGraph: {
      title: `${username} | Elysia`,
      description: `Профиль пользователся ${username}`,
      images: {
        url: user?.avatar ?? "",
      },
      siteName: "Elysia"
    },
  };
}

const Page = async ({ params }: Props) => {
  const { username } = await params;
  const user = await CheckUser(username);
  const authUser = await GetPayload();

  if (!user) redirect("/404");

  return (
    <>
      <User username={username}>
        {username === authUser?.username && (
          <CreateProducts>
            <Button>
              <TicketPlus />
              Создать
            </Button>
          </CreateProducts>
        )}
      </User>
      <Separator className="my-4" />
      <section className="container mx-auto grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <UserProducts username={username} />
      </section>
    </>
  );
};

export default Page;

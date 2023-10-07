import Link from "next/link";
import Image from "next/image";
import { Button } from "../../button";
import { Bell, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Input } from "../../input";

const Navbar = () => {
  return (
    <div className="bg-main fixed z-50 flex h-14 w-full border-b border-neutral-800 text-white shadow-xl max-[1280px]:px-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Link
            className="border border-indigo-900 shadow-sm shadow-indigo-700"
            href="/"
          >
            <Image
              alt="Лого Сайта"
              src="/favicon.png"
              width={42}
              height={45}
              className="object-cover"
            />
          </Link>

          <div className="relative w-[425px]  max-lg:hidden">
            <div className="z-50 flex min-h-[40px] items-center gap-1 rounded-sm border border-neutral-700 bg-black  shadow-md focus-within:border-indigo-500 ">
              <Input
                type="text"
                placeholder="Глобальный Поиск"
                className="border-none bg-transparent shadow-none outline-none group-hover:border-indigo-600"
              />
              <Button className="bg-transparent  p-2 hover:bg-indigo-900">
                <Search className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button className="border border-indigo-600 bg-transparent text-indigo-400 shadow-sm shadow-indigo-700 hover:bg-indigo-600 hover:text-white ">
                Войти
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="border border-indigo-600 bg-transparent text-indigo-400 shadow-sm shadow-indigo-700 hover:bg-indigo-600 hover:text-white ">
                Регистрация
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Button className="border border-indigo-600 bg-transparent text-indigo-400 shadow-sm shadow-indigo-700 hover:bg-indigo-600 hover:text-white ">
              Опубликовать
            </Button>
            <Button className="bg-transparent p-2 hover:bg-indigo-600">
              <Bell className="cursor-pointer transition hover:opacity-90" />
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

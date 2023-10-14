import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Bell, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Input } from "../../ui/input";

const Navbar = () => {
  return (
    <div className="bg-main fixed z-50 flex h-14 w-full border-b border-neutral-800 text-white shadow-xl max-[1280px]:px-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-3">
          {/* <h1 className="text-4xl font-bold text-indigo-500">V</h1> */}
          <Link className="border-2 border-indigo-800" href="/">
            <Image
              alt="Лого Сайта"
              src="/favicon.png"
              width={40}
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
              <Button className="button-main">Войти</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="button-main">Регистрация</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/create">
              <Button className="button-main">Опубликовать</Button>
            </Link>
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

import Link from "next/link";
import Image from "next/image";
import { FilePlus, Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Input } from "../../ui/input";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="bg-main fixed z-50 flex h-14 w-full border-b border-neutral-800 shadow-xl max-[1280px]:px-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Link className="border-2 border-indigo-800 max-sm:hidden" href="/">
            <Image
              alt="Лого Сайта"
              src="/favicon.png"
              width={40}
              height={45}
              className="object-cover"
            />
          </Link>

          <div className="sm:hidden">
            <MobileNavbar />
          </div>

          <div className="relative w-[425px] max-lg:hidden">
            <div className="z-50 flex min-h-[40px] items-center gap-1 rounded-sm border border-neutral-700 bg-black  shadow-md focus-within:border-indigo-500 ">
              <Input
                type="text"
                placeholder="Введите запрос"
                className="border-none bg-transparent shadow-none outline-none"
              />
              <button className="button !rounded-r-none bg-transparent !p-2 hover:bg-indigo-700">
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <SignedOut>
            <Link href="/sign-in">
              <button className="button button-main">Войти</button>
            </Link>
            <Link href="/sign-up">
              <button className="button button-main">Регистрация</button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/create">
              <button className="button button-main flex items-center gap-1.5">
                <FilePlus className="h-4 w-4" />
                Опубликовать
              </button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

import {
  Cake,
  ExternalLink,
  FileEdit,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const NoProfile = () => {
  const userInfo = [
    {
      icon: MapPin,
      text: "Не Известно",
    },
    {
      icon: Cake,
      text: `Регистрация: октябрь 2023`,
    },
  ];
  return (
    <div className="pt-[75px] mx-auto w-full max-w-6xl max-md:px-3 px-4">
      <div className="bg-main mt-12 w-full rounded-md border-neutral-900 pb-8">
        <div className="relative flex flex-col items-center max-md:items-start max-md:px-3">
          <div className="relative -mt-12 h-32 w-32">
            <Image
              fill
              className="aspect-auto rounded-full object-cover object-top border-[8px] border-black"
              alt="Test alt"
              src="/nouser.jfif"
            />
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left">
            <div>
              <h1 className="text-3xl font-bold">Аккаунт не найден</h1>
              <p className="text-neutral-400">@404-error</p>
            </div>
            <p className="max-w-2xl">Информация отсутствует.</p>

            <div className="mt-4 flex gap-6 max-md:flex-col max-md:gap-4">
              {userInfo?.map((item: any) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon color="#969696" className="h-5 w-5" />
                  <p className="pt-1 text-sm text-neutral-400">{item.text}</p>
                </div>
              ))}
              <Link
                target="_blank"
                href="https://v-hazel-beta.vercel.app/"
                className="flex items-center gap-2 group"
              >
                <ExternalLink
                  color="#969696"
                  className="h-5 w-5 !group-hover:text-indigo-500 transition"
                />
                <p className="pt-1 text-sm text-neutral-400 group-hover:text-indigo-500 transition">
                  v-hazel-beta.vercel.app
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex items-start gap-3 pb-4">
        <div className="bg-main flex w-[330px] flex-col gap-5 p-5 max-md:hidden">
          <div className="flex items-center gap-2.5">
            <FileEdit color="#969696" className="h-5 w-5" />
            <p className="text-neutral-200">Публикаций: 0</p>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageCircle color="#969696" className="h-5 w-5" />
            <p className="text-neutral-200">Комментариев: 0</p>
          </div>
        </div>

        <div className="w-full flex-col gap-1.5 bg-main h-[400px] flex justify-center items-center">
          <div className="relative h-52 w-52">
            <Image
              fill
              className="rounded-md object-cover object-center "
              alt="Test alt"
              src="/sad.webp"
            />
          </div>
          <h3 className="text-center font-semibold ">Ничего не найдено..</h3>
          <Link href={"/"}>
            <Button className="button-main mt-2">Главная</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NoProfile;

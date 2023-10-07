import { Eye, Heart, MessageCircle, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const PostCard = ({ firstPost }: { firstPost?: boolean }) => {
  return (
    <div className="bg-main flex w-full flex-col items-start rounded-md border border-neutral-800/40">
      {firstPost && (
        <div className="relative h-64 w-full">
          <Image
            fill
            className="aspect-auto object-cover object-top"
            alt="Test alt"
            src="https://i.pinimg.com/736x/cf/e8/6a/cfe86a06289fece50de884fe8ac059c6.jpg"
          />
        </div>
      )}
      <div className="relative py-4 pl-5 pr-7">
        <div className="absolute right-7 top-4">
          <Save className="text-neutral-300" />
        </div>
        <div className="flex gap-1.5">
          <div className="relative h-8 w-12">
            <Image
              fill
              className="rounded-full object-cover"
              alt="Test alt"
              src="https://i.pinimg.com/564x/5e/37/0c/5e370c648fe74d1504091a4267b82559.jpg"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h3>EternalSide</h3>
              <p className="text-xs text-neutral-400">23 Октября 18:10</p>
            </div>
            <Link
              href="/"
              className="text-3xl font-bold transition hover:text-indigo-400"
            >
              Изучаем React и Next.Js на практике, делая крутые сайты!
            </Link>
            <div className="flex items-center gap-3">
              <Button className="border border-transparent bg-transparent !py-1 text-neutral-300 hover:border hover:border-neutral-700 hover:bg-neutral-800">
                #React
              </Button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <Link
                  className="flex items-center gap-1 rounded-md px-2.5 py-2 hover:bg-neutral-800"
                  href="/"
                >
                  <Heart className="text-neutral-300" />
                  <p className="text-sm text-neutral-300">Мне нравится: 25</p>
                </Link>
                <Link
                  className="flex items-center gap-1 rounded-md px-3.5 py-2 hover:bg-neutral-800"
                  href="/"
                >
                  <MessageCircle className="text-neutral-300" />
                  <p className="text-sm text-neutral-300">Комментариев: 30</p>
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="text-neutral-300" />
                <p className="text-sm text-neutral-300">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;

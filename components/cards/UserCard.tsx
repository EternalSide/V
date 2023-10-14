import { formatDate } from "@/lib/utils";
import { UserAvatar } from "../shared/UserAvatar";
import Link from "next/link";
import { Button } from "../ui/button";

const UserCard = ({ author }: any) => {
  const userButtonInfo = [
    {
      label: "О себе:",
      text: author?.bio ? author.bio : "Информация отсутствует.",
    },
    {
      label: "Постов:",
      text: author.posts.length,
    },
    {
      label: "Регистрация:",
      text: formatDate(author.joinedAt),
    },
  ];
  return (
    <div className="bg-main relative h-fit w-[320px] rounded-md border border-neutral-800 max-lg:hidden">
      <div className="w-full h-16 bg-indigo-700" />
      <div className="p-5 ">
        <Link className="flex items-start gap-2" href={`/${author.username}`}>
          <UserAvatar
            alt={author.name}
            classNames="h-10 w-10"
            imgUrl={author.picture}
          />
          <div>
            <h3 className="text-xl font-semibold first-letter:uppercase">
              {author.name}
            </h3>
            <p className="text-sm text-neutral-400">@{author.username}</p>
          </div>
        </Link>

        <div className="mt-4 flex flex-col gap-4">
          {userButtonInfo.map((item: any) => (
            <div key={item.label}>
              <h3 className="text-base font-semibold text-neutral-400">
                {item.label}
              </h3>
              <p>{item.text}</p>
            </div>
          ))}

          <Link href={`/${author.username}`}>
            <Button className="w-full bg-indigo-600 text-white">Профиль</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserCard;

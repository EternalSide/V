import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

const CreatePage = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  const mongoUser = await getUserById({ clerkId });

  return (
    <>
      <div className="fixed z-50 flex h-14 w-full border-b border-neutral-800 text-white shadow-xl max-[1280px]:px-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Link className="border border-indigo-900" href="/">
              <Image
                alt="Лого Сайта"
                src="/favicon.png"
                width={40}
                height={45}
                className="object-cover"
              />
            </Link>
            <p className="font-semibold">Новый Пост</p>
          </div>
          <Link href="/">
            <Button className="button-main">На Главную</Button>
          </Link>
        </div>
      </div>

      <CreatePostForm mongoUserId={mongoUser._id.toString()} />
    </>
  );
};
export default CreatePage;

import Chat from "@/components/shared/Chat";
import TagHeader from "@/components/shared/TagHeader";
import { getTagInfo } from "@/lib/actions/tag.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const tag = await getTagInfo({
    tagName: params.name,
  });

  if (!tag) {
    return {
      title: `Тег не найден / V`,
    };
  }

  return {
    title: `Чат / ${tag.name} / V`,
  };
}

const TagChat = async ({ params }: { params: { name: string } }) => {
  const tag = await getTagInfo({
    tagName: params.name,
  });

  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });

  const isFollowing = tag.followers.some(
    (t: any) => t._id.toString() === user?._id.toString(),
  );

  const isCreator = tag.author?.toString() === user?._id.toString();

  return (
    <div className="flex h-full w-full justify-end ">
      <div className="ml-auto flex h-full w-full max-w-7xl flex-col  max-[1280px]:px-4">
        <TagHeader
          chat={true}
          tagId={JSON.stringify(tag._id)}
          tagTitle={tag.name}
          tagDescription={tag?.description}
          tagPicture={tag?.picture}
          isFollowing={isFollowing}
          isCreator={isCreator}
          userId={JSON.stringify(user?._id)}
        />
        <Chat
          tagId={tag._id.toString()}
          authorId={user?._id.toString()}
          messagesQ={JSON.stringify(tag.messages)}
        />
      </div>
    </div>
  );
};
export default TagChat;

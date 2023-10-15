import CreateEditTagForm from "@/components/forms/CreateEditTagForm";
import { getTagInfo } from "@/lib/actions/tag.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface EditTagPageProps {
  params: {
    name: string;
  };
}

const EdiTagPage = async ({ params }: EditTagPageProps) => {
  const tag = await getTagInfo({
    tagName: params.name,
  });

  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });
  const isCreator = tag.author?.toString() === user?._id.toString();
  if (!isCreator) redirect("/");

  return (
    <div className="w-full pt-[85px] max-[1280px]:px-4">
      <h1 className="text-4xl font-bold first-letter:uppercase">
        Изменить - {params.name}
      </h1>
      <CreateEditTagForm
        type="Edit"
        tagDetails={JSON.stringify(tag)}
        mongoUserId={user._id.toString()}
      />
    </div>
  );
};
export default EdiTagPage;

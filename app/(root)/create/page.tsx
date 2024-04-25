import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import CreateEditPostForm from "@/components/forms/CreateEditPostForm";

export const metadata = {
  title: {
    absolute: "Опубликовать / V",
  },
};
const CreatePage = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) return redirect("/sign-in");

  const mongoUser = await getUserById({ clerkId });

  return (
    <div className="mx-auto w-full max-w-7xl pb-8 pt-[85px]  max-[1280px]:px-4">
      <h1 className="h1-bold">Опубликовать</h1>
      <CreateEditPostForm mongoUserId={mongoUser._id.toString()} />
    </div>
  );
};
export default CreatePage;

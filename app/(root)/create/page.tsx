import CreatePostForm from "@/components/forms/CreatePostForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
export const metadata = {
  title: {
    absolute: "Новый пост / V",
  },
};
const CreatePage = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) return redirect("/sign-in");

  const mongoUser = await getUserById({ clerkId });

  return (
    <>
      <CreatePostForm mongoUserId={mongoUser._id.toString()} />
    </>
  );
};
export default CreatePage;

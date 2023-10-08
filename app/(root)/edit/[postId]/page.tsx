import CreatePostForm from "@/components/forms/CreatePostForm";
import { getPostById } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const EditPostPage = async ({ params }: { params: { postId: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ clerkId: userId });

  const post = await getPostById({ id: params.postId });

  const isOwnPost = post?.author.clerkId === userId;
  if (!isOwnPost) redirect("/");

  return (
    <>
      <CreatePostForm
        type="Edit"
        postDetails={JSON.stringify(post)}
        mongoUserId={mongoUser._id.toString()}
      />
    </>
  );
};
export default EditPostPage;

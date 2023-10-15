import EditProfileForm from "@/components/forms/EditProfileForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Настройки / V",
  },
};
export default async function SettingsPage() {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const user = await getUserById({ clerkId: userId });

  return (
    <section className="mx-auto flex w-full max-w-2xl gap-3 pb-4  pt-[75px] max-md:px-3">
      <div className="flex flex-1 flex-col gap-3">
        <Link
          href={`/${user.username}`}
          className="text-3xl font-bold text-indigo-500"
        >
          @{user.username}
        </Link>

        <div className="mt-3">
          <EditProfileForm user={JSON.stringify(user)} />
        </div>
      </div>
    </section>
  );
}

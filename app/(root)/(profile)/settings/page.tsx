import EditProfileForm from "@/components/forms/EditProfileForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { UserCheck } from "lucide-react";
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

  const profileSettingsLinks = [
    {
      label: "Профиль",
      href: "/settings",
      icon: UserCheck,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-2xl max-md:px-3 mt-12 flex gap-3">
      {/* <aside className="max-w-[250px] w-full">
        {profileSettingsLinks.map((item: any) => {
          return (
            <Link
              className="flex items-center gap-2.5"
              key={item.href}
              href={item.href}
            >
              <item.icon />
              <p>{item.label}</p>
            </Link>
          );
        })}
      </aside> */}
      <div className="flex flex-col gap-3 flex-1">
        <Link
          href={`/${user.username}`}
          className="text-indigo-500 text-3xl font-bold"
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

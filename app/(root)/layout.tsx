import Navbar from "@/components/shared/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { getUserById } from "@/lib/actions/user.action";
import Notifications from "@/providers/Notifications";

import { ChildrenProps } from "@/types";
import { auth } from "@clerk/nextjs";

const RootLayout = async ({ children }: ChildrenProps) => {
  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });

  return (
    <main className="relative">
      <Navbar />
      <div className="relative mx-auto flex w-full max-w-7xl text-white">
        {children}
        <Notifications userId={user?._id.toString()} />
        <Toaster />
      </div>
    </main>
  );
};
export default RootLayout;

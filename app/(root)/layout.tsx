import LeftSidebar from "@/components/ui/shared/LeftSidebar/LeftSidebar";
import Navbar from "@/components/ui/shared/Navbar/Navbar";
import RightSidebar from "@/components/ui/shared/RightSidebar/RightSidebar";

import { ChildrenProps } from "@/types";

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="relative mx-auto flex w-full max-w-7xl pt-[75px]">
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-5 pb-6 max-md:pb-14 sm:px-4">
          <div className="w-full max-w-3xl text-white">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};
export default RootLayout;

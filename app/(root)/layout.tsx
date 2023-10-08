import Navbar from "@/components/shared/Navbar/Navbar";

import { ChildrenProps } from "@/types";

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <main className="relative">
      {/* <Navbar /> */}
      <div className="relative mx-auto flex w-full max-w-7xl pt-[75px] text-white">
        {children}
      </div>
    </main>
  );
};
export default RootLayout;

import Navbar from "@/components/shared/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ModalProvider from "@/providers/ModalProvider";

import { ChildrenProps } from "@/types";

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="relative mx-auto flex w-full max-w-7xl text-white">
        {children}
        <Toaster />
        <ModalProvider />
      </div>
    </main>
  );
};
export default RootLayout;

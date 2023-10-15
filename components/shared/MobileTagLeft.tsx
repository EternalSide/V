import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const MobileTagLeft = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="h-7 w-7" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-main text-white w-64 overflow-y-auto  border-r-black "
        >
          <SheetHeader>
            <SheetTitle>
              <Link className="!p-5 !mt-5" href={"/create"}>
                <Button className="text-white bg-indigo-600 !p-5">
                  Новый пост
                </Button>
              </Link>
            </SheetTitle>
            <SheetDescription>
              <div className="border-t  py-5 mt-4 border-b border-neutral-800 ">
                <h3 className="font-semibold">Информация</h3>
                <p className="text-sm text-zinc-300 mt-4">
                  1️⃣ Post Facebooks React ⚛ related posts/questions/discussion
                  topics here~ <br /> <br />
                  2️⃣ There are no silly posts or questions as we all learn from
                  each other👩‍🎓👨‍🎓 <br /> <br />
                  3️⃣ Adhere to dev.to 👩‍💻👨‍💻Code of Conduct
                </p>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileTagLeft;

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
          className="bg-main w-64 overflow-y-auto border-r-black  text-white "
        >
          <SheetHeader>
            <SheetTitle>
              <Link className="!mt-5 !p-5" href={"/create"}>
                <Button className="bg-indigo-600 !p-5 text-white">
                  Новый пост
                </Button>
              </Link>
            </SheetTitle>
            <SheetDescription>
              <div className="mt-4  border-y border-neutral-800 py-5 ">
                <h3 className="font-semibold">Информация</h3>
                <p className="mt-4 text-sm text-zinc-300">
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

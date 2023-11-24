import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import UsersCard from "./users-card";
import SignedInCard from "./signed-in-card";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default async function HamburgerMenu() {
  return (
    <section className="mt-[6px]">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Monarch Community</SheetTitle>
            <SheetDescription>
              Share your ideas with people around the world through blogs.
            </SheetDescription>
          </SheetHeader>

          <section className="mt-8">
            <SignedOut>
              <UsersCard />
            </SignedOut>
            <SignedIn>
              <SignedInCard />
            </SignedIn>
          </section>
        </SheetContent>
      </Sheet>
    </section>
  );
}

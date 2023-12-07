import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import Logo from "./logo";
import TotalUserCard from "./total-user-card";
import SignedInCard from "./signed-in-card";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default async function HamburgerMenu() {
  return (
    <section className="mt-1">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="h-6 w-6" />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Monarch Community</SheetTitle>
            <SheetDescription>
              Share your ideas with people around the world through blogs.
            </SheetDescription>
          </SheetHeader>

          <section className="mt-8">
            <section className="mb-2 ml-4 block sm:hidden">
              <Logo />
            </section>
            <SignedOut>
              <TotalUserCard />
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

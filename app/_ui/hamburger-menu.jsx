import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SignedOut } from "@clerk/nextjs";

import UsersCard from "./users-card";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function HamburgerMenu() {
  return (
    <section className="mt-2">
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
          </section>
        </SheetContent>
      </Sheet>
    </section>
  );
}

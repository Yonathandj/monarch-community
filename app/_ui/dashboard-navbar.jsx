import { SignedIn, SignedOut } from "@clerk/nextjs";

import Logo from "./logo";
import Search from "./search";
import HamburgerMenu from "./hamburger-menu";
import SignedInUserAvatar, { SignedOutUserAvatar } from "./user-avatar";

export default function DashboardNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between p-2">
        <section className="flex gap-x-4 items-center">
          <section className="hidden sm:block">
            <Logo />
          </section>
          <Search />
        </section>
        <section className="block md:hidden mt-2">
          <section className="flex gap-x-4 items-center">
            <section>
              <SignedIn>
                <SignedInUserAvatar />
              </SignedIn>
              <SignedOut>
                <SignedOutUserAvatar />
              </SignedOut>
            </section>
            <HamburgerMenu />
          </section>
        </section>
      </nav>
    </header>
  );
}

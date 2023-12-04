import { SignedIn, SignedOut } from "@clerk/nextjs";

import Logo from "./logo";
import Search from "./search";
import HamburgerMenu from "./hamburger-menu";
import SignedInUserAvatar, { SignedOutUserAvatar } from "./user-avatar";

export default function DashboardNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between p-2">
        <section className="flex items-center gap-x-4">
          <section className="hidden sm:block">
            <Logo />
          </section>
          <Search />
        </section>
        <section className="mt-2 block md:hidden">
          <section className="flex items-center gap-x-4">
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

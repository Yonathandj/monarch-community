import Logo from "./logo";
import Search from "./search";
import HamburgerMenu from "./hamburger-menu";

export default function DashboardNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between p-2">
        <section className="flex gap-x-4 items-center">
          <Logo />
          <Search />
        </section>
        <section className="block md:hidden mt-2">
          <section className="flex gap-x-6 items-center">
            <section>{/* AVATAR */}</section>
            <HamburgerMenu />
          </section>
        </section>
      </nav>
    </header>
  );
}

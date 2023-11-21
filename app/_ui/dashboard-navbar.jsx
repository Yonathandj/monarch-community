import Logo from "./logo";
import Search from "./search";
import HamburgerMenu from "./hamburger-menu";

export default function DashboardNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between p-2">
        <section className="flex gap-x-2 items-center">
          <Logo />
          <Search />
        </section>
        <section className="block md:hidden">
          <HamburgerMenu />
        </section>
      </nav>
    </header>
  );
}

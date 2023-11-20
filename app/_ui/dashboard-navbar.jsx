import Logo from "./logo";
import Search from "./search";

export default function DashboardNavbar() {
  return (
    <header>
      <nav>
        <section className="flex gap-x-2 items-center">
          <Logo />
          <Search />
        </section>
      </nav>
    </header>
  );
}

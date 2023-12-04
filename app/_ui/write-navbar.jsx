import Logo from "./logo";
import WritePreviewSwitcher from "./write-preview-switcher";

export default function WriteNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between px-4 py-2">
        <section>
          <Logo />
        </section>
        <section>
          <WritePreviewSwitcher />
        </section>
      </nav>
    </header>
  );
}

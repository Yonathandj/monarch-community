import Logo from "./logo";
import WritePreviewSwitcher from "./write-preview-switcher";

export default function WriteNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between py-2 px-4">
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

import MainNavbar from "../_ui/main-navbar";
import {
  SettingNavbarMediumViewport,
  SettingNavbarSmallViewport,
} from "../_ui/setting-navbar";

export default function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      <main className="flex w-full flex-col space-y-4 px-2 py-6 md:flex-row md:space-x-20 md:space-y-0 md:p-8">
        <aside className="hidden md:block">
          <SettingNavbarMediumViewport />
        </aside>
        <aside className="block md:hidden">
          <SettingNavbarSmallViewport />
        </aside>
        <section className="flex-1">{children}</section>
      </main>
    </>
  );
}

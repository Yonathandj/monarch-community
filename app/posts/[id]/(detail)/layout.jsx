import MainNavbar from "@/app/_ui/main-navbar";

export default function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}

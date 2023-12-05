import MainNavbar from "../_ui/main-navbar";

export default function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}

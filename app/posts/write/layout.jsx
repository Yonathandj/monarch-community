import WriteNavbar from "@/app/_ui/write-navbar";

export default function Layout({ children }) {
  return (
    <>
      <WriteNavbar />
      {children}
    </>
  );
}

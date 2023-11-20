import DashboardNavbar from "../_ui/dashboard-navbar";

export default function Layout({ children }) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}

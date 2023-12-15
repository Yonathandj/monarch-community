import WriteUpdatePostNavbar from "@/app/_ui/write-update-post-navbar";

import UpdatePostContextProvider from "@/app/_provider/update-post-context-provider";

export default function Layout({ children }) {
  return (
    <>
      <UpdatePostContextProvider>
        <WriteUpdatePostNavbar />
        {children}
      </UpdatePostContextProvider>
    </>
  );
}

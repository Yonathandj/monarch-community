import WriteUpdatePostNavbar from "@/app/_ui/write-update-post-navbar";

import WritePostContextProvider from "@/app/_provider/write-post-context-provider";

export default function Layout({ children }) {
  return (
    <>
      <WritePostContextProvider>
        <WriteUpdatePostNavbar />
        {children}
      </WritePostContextProvider>
    </>
  );
}

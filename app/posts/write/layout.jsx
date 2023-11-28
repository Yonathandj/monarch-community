import WriteNavbar from "@/app/_ui/write-navbar";

import PostContextProvider from "@/app/_provider/post-context-provider";

export default function Layout({ children }) {
  return (
    <>
      <PostContextProvider>
        <WriteNavbar />
        {children}
      </PostContextProvider>
    </>
  );
}

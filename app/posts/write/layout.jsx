import WritePostNavbar from "@/app/_ui/write-post-navbar";

import PostContextProvider from "@/app/_provider/post-context-provider";

export default function Layout({ children }) {
  return (
    <>
      <PostContextProvider>
        <WritePostNavbar />
        {children}
      </PostContextProvider>
    </>
  );
}

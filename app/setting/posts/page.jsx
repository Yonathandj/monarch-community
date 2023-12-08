import PostsTable from "@/app/_ui/posts-table";
import { auth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = auth();
  return (
    <>
      <PostsTable userId={userId} />
    </>
  );
}

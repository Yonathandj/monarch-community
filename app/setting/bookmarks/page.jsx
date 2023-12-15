import { auth } from "@clerk/nextjs";
import BookmarksTable from "@/app/_ui/bookmarks-table";

export default function Page() {
  const { userId } = auth();
  return (
    <>
      <BookmarksTable userId={userId} />
    </>
  );
}

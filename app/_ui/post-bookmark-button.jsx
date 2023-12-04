import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButtonUserInteractionBookmark } from "./sign-in-button";

import { getBookmarkById, getTotalBookmarks } from "../_lib/data";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { bookmarkAction } from "../_lib/actions";

export default async function PostBookmarkButton({ userId, postId }) {
  const totalBookmarks = await getTotalBookmarks();
  const bookmarkSelectedUser = await getBookmarkById(userId, postId);

  const updateBookmarkActionWithId = bookmarkAction.bind(null, userId, postId);
  return (
    <>
      <SignedOut>
        <SignInButtonUserInteractionBookmark totalBookmarks={totalBookmarks} />
      </SignedOut>

      <SignedIn>
        <form action={updateBookmarkActionWithId}>
          <Button variant="outline">
            {bookmarkSelectedUser ? (
              <BookmarkFilledIcon className="mr-2 h-5 w-5 text-sky-600" />
            ) : (
              <BookmarkIcon className="mr-2 h-5 w-5" />
            )}
            <span>{totalBookmarks ? totalBookmarks : 0}</span>
          </Button>
        </form>
      </SignedIn>
    </>
  );
}

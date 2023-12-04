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
              <BookmarkFilledIcon className="w-5 h-5 text-sky-600 mr-2" />
            ) : (
              <BookmarkIcon className="w-5 h-5 mr-2" />
            )}
            <span>{totalBookmarks ? totalBookmarks : 0}</span>
          </Button>
        </form>
      </SignedIn>
    </>
  );
}

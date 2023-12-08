import { auth } from "@clerk/nextjs";
import {
  getBookmarkById,
  getTotalLikesByPostId,
  getTotalBookmarksByPostId,
} from "../_lib/data";

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";

export default async function PostsCardFooter({ postId }) {
  const { userId } = auth();

  const totalLikes = await getTotalLikesByPostId(postId);
  const likeCurrentUser = await getLikeById(userId, postId);

  const totalBookmarks = await getTotalBookmarksByPostId(postId);
  const bookmarkCurrentUser = await getBookmarkById(userId, postId);
  return (
    <section className="flex gap-x-4">
      <span className="flex gap-x-2">
        {likeCurrentUser ? (
          <HeartFilledIcon className="mr-2 h-5 w-5 text-red-600" />
        ) : (
          <HeartIcon className="mr-2 h-5 w-5" />
        )}
        <span>
          {!totalLikes
            ? `0 like and be the first`
            : totalLikes > 1
              ? `${totalLikes} likes`
              : `${totalLikes} like`}
        </span>
      </span>

      <span className="flex gap-x-2">
        {bookmarkCurrentUser ? (
          <BookmarkFilledIcon className="mr-2 h-5 w-5 text-red-600" />
        ) : (
          <BookmarkIcon className="mr-2 h-5 w-5" />
        )}
        <span>
          {!totalBookmarks
            ? `0 bookmark and be the first`
            : totalBookmarks > 1
              ? `${totalBookmarks} bookmarks`
              : `${totalBookmarks} bookmark`}
        </span>
      </span>
    </section>
  );
}

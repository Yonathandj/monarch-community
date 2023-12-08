import { auth } from "@clerk/nextjs";
import {
  getLikeById,
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
    <section className="flex gap-x-6">
      <span className="flex items-center">
        {likeCurrentUser ? (
          <HeartFilledIcon className="mr-2 h-5 w-5 text-red-600" />
        ) : (
          <HeartIcon className="mr-2 h-5 w-5" />
        )}
        <span className="text-sm">
          {!totalLikes
            ? `0 like and be the first`
            : totalLikes > 1
              ? `${totalLikes} likes`
              : `${totalLikes} like`}
        </span>
      </span>

      <span className="flex items-center">
        {bookmarkCurrentUser ? (
          <BookmarkFilledIcon className="mr-2 h-5 w-5 text-sky-600" />
        ) : (
          <BookmarkIcon className="mr-2 h-5 w-5" />
        )}
        <span className="text-sm">
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

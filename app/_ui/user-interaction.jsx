import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import BookmarkButton from "./bookmark-button";

export default function UserInteraction({ userId, postId }) {
  return (
    <section className="fixed bottom-0 left-0 right-0 bg-zinc-100 md:static md:bg-transparent z-10">
      <section className="p-2 md:p-4 flex flex-row md:flex-col gap-x-4 md:gap-x-0 md:gap-y-4 justify-around items-center">
        <LikeButton userId={userId} postId={postId} />
        <CommentButton userId={userId} postId={postId} />
        <BookmarkButton userId={userId} postId={postId} />
      </section>
    </section>
  );
}

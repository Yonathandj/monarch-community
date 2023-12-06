import PostLikeButton from "./post-like-button";
import PostCommentButton from "./post-comment-button";
import PostBookmarkButton from "./post-bookmark-button";

export default function UserInteraction({ userId, postId }) {
  return (
    <section className="fixed bottom-0 left-0 right-0 z-10 bg-zinc-50 md:static md:bg-transparent">
      <section className="flex flex-row items-center justify-around gap-x-4 p-2 md:flex-col md:gap-x-0 md:gap-y-4 md:p-4">
        <PostLikeButton userId={userId} postId={postId} />
        <PostCommentButton userId={userId} postId={postId} />
        <PostBookmarkButton userId={userId} postId={postId} />
      </section>
    </section>
  );
}

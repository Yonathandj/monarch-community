import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Textarea } from "@/components/ui/textarea";
import { SignInButtonPostPublishComment } from "./sign-in-button";
import PostPublishCommentButton from "./post-publish-comment-button";

export default function PostCommentForm({ userId }) {
  return (
    <>
      <SignedIn>
        <form className="mx-auto mb-12 flex max-w-[600px] flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2 lg:gap-y-0">
          <Textarea
            name="comment"
            placeholder="Share your comment"
            className="resize-none overflow-hidden shadow-none focus-visible:ring-0"
          />
          <section>
            <PostPublishCommentButton userId={userId} />
          </section>
        </form>
      </SignedIn>
      <SignedOut>
        <section className="mx-auto mb-12 flex max-w-[600px] flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2 lg:gap-y-0">
          <Textarea
            placeholder="Share your comment"
            className="resize-none overflow-hidden shadow-none focus-visible:ring-0"
          />
          <section>
            <SignInButtonPostPublishComment />
          </section>
        </section>
      </SignedOut>
    </>
  );
}

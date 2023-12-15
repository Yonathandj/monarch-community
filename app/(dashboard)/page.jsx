import { SignedIn, SignedOut } from "@clerk/nextjs";

import PostsCard from "../_ui/posts-card";
import SignedInCard from "../_ui/signed-in-card";
import TotalUserCard from "../_ui/total-user-card";

export default function Page() {
  return (
    <main className="mt-6 flex gap-x-4">
      <section className="hidden max-w-[350px] lg:block">
        <SignedOut>
          <TotalUserCard />
        </SignedOut>
        <SignedIn>
          <SignedInCard />
        </SignedIn>
      </section>
      <section className="mx-auto lg:mx-0">
        <PostsCard />
      </section>
    </main>
  );
}

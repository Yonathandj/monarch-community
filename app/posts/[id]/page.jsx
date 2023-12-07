import { auth } from "@clerk/nextjs";

import UserCard from "@/app/_ui/user-card";
import PostDetail from "@/app/_ui/post-detail";
import UserInteraction from "@/app/_ui/user-interaction";

export default function Page({ params: { id } }) {
  const { userId } = auth();
  return (
    <main className="mt-6 flex">
      <UserInteraction userId={userId} postId={id} />
      <section className="flex flex-col-reverse lg:flex-row">
        <PostDetail userId={userId} postId={id} />
        <UserCard userId={userId} postId={id} />
      </section>
    </main>
  );
}

import Link from "next/link";

import { UserAvatar } from "./user-avatar";
import PostsCardFooter from "./posts-card-footer";
import {
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  Card,
} from "@/components/ui/card";

import { getPublishedPosts } from "../_lib/data";

export default async function PostsCard() {
  const publishedPosts = await getPublishedPosts();

  return (
    <section className="mx-auto flex max-w-[600px] flex-col gap-y-4">
      {publishedPosts.map((publishedPost) => (
        <Card key={publishedPost._id} className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <UserAvatar user={publishedPost.userId} />
              <section className="group relative">
                <h2 className="font-bold">
                  {publishedPost.userId.clerk.fullName}
                </h2>
                <p className="text-sm">
                  {publishedPost.createdAt.toISOString().split("T")[0] || "-"}
                </p>
              </section>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Link href={`/posts/${publishedPost._id}`}>
              <h2 className="text-2xl font-bold">{publishedPost.data.title}</h2>
            </Link>
            <section className="mt-2 flex gap-x-2">
              {publishedPost.data.tags.length > 0
                ? publishedPost.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#edf2f7] px-2 text-sm"
                    >
                      #{tag}
                    </span>
                  ))
                : null}
            </section>
          </CardContent>
          <CardFooter>
            <PostsCardFooter postId={publishedPost._id} />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

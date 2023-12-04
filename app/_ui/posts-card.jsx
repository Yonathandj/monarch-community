import Link from "next/link";

import {
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";

import { getPublishedPosts } from "../_lib/data";

export default async function PostsCard() {
  const publishedPosts = await getPublishedPosts();

  return (
    <section className="max-w-[600px]">
      {publishedPosts.map((publishedPost) => (
        <Card key={publishedPost._id} className="p-4">
          <CardContent>
            <Link href={`/posts/${publishedPost._id}`}>
              <h2 className="text-2xl font-bold">{publishedPost.data.title}</h2>
            </Link>
            <section className="mt-2 flex gap-x-2">
              {publishedPost.data.tags.length > 0
                ? publishedPost.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-[#edf2f7] px-2 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))
                : null}
            </section>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
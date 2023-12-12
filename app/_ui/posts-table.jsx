import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";

import { getAllPostByUserId } from "../_lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DeletePostButton from "./delete-post-button";

export default async function PostsTable({ userId }) {
  const allPost = await getAllPostByUserId(userId);

  return (
    <section>
      {allPost ? (
        <section>
          <Table className="hidden sm:block">
            <TableCaption>
              A list of your published and unpublished post(s)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[400px] text-center">
                  Post(s)
                </TableHead>
                <TableHead className="max-w-[200px] text-center">
                  Status
                </TableHead>
                <TableHead className="text-center">Update post</TableHead>
                <TableHead className="text-center">Delete post</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPost.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    <Link
                      className="hover:underline"
                      href={
                        post.isPublished ? `/posts/${post._id}` : "/posts/write"
                      }
                    >
                      {post.data.title ? post.data.title : "Untitled post"}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {post.isPublished ? `Published post` : "Unpublished post"}
                  </TableCell>
                  <TableCell>
                    <Button
                      asChild
                      variant="secondary"
                      className="rounded-2xl bg-yellow-400"
                    >
                      <Link
                        href={
                          post.isPublished
                            ? `/posts/${post._id}/update`
                            : "/posts/write"
                        }
                      >
                        <Pencil1Icon className="mr-2 h-4 w-4" />
                        Update
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <form className="w-full">
                      <DeletePostButton
                        postId={post._id}
                        profileImageURL={post.data.profileImageURL}
                      />
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Table className="block sm:hidden">
            <TableCaption>
              A list of your published and unpublished post(s)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[400px] text-center">
                  Post(s)
                </TableHead>
                <TableHead className="max-w-[200px] text-center">
                  Status
                </TableHead>
                <TableHead className="text-center">
                  Update/Delete post
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPost.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    <Link
                      className="hover:underline"
                      href={
                        post.isPublished ? `/posts/${post._id}` : "/posts/write"
                      }
                    >
                      {post.data.title ? post.data.title : "Untitled post"}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {post.isPublished ? `Published post` : "Unpublished post"}
                  </TableCell>
                  <TableCell className="flex flex-col gap-y-2">
                    <Button
                      asChild
                      variant="secondary"
                      className="rounded-2xl bg-yellow-400"
                    >
                      <Link
                        href={
                          post.isPublished
                            ? `/posts/${post._id}/update`
                            : "/posts/write"
                        }
                      >
                        <Pencil1Icon className="mr-2 h-4 w-4" />
                        Update
                      </Link>
                    </Button>
                    <form className="w-full">
                      <DeletePostButton
                        postId={post._id}
                        profileImageURL={post.data.profileImageURL}
                      />
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <p className="mt-10 text-center">
          Sorry you dont have post yet. Please create new one!
        </p>
      )}
    </section>
  );
}

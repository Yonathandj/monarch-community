import Link from "next/link";

import { getBookmarksByUserId } from "../_lib/data";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import DeleteBookmarkButton from "./delete-bookmark-button";

export default async function BookmarksTable({ userId }) {
  const allBookmark = await getBookmarksByUserId(userId, "postId", {
    _id: 1,
    "data.title": 1,
  });
  return (
    <section>
      <Table>
        <TableCaption>A list of your bookmarked post(s)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[400px] text-center">Post(s)</TableHead>
            <TableHead className="text-center">Delete bookmark</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBookmark.map((bookmark) => (
            <TableRow key={bookmark._id}>
              <TableCell className="font-medium">
                <Link
                  className="hover:underline"
                  href={`/posts/${bookmark.postId._id}`}
                >
                  {bookmark.postId.title}{" "}
                </Link>
              </TableCell>
              <TableCell>
                <form className="w-full">
                  <DeleteBookmarkButton bookmarkId={bookmark._id} />
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

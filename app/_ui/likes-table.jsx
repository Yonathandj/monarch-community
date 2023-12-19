import Link from "next/link";

import { getLikesByUserId } from "../_lib/data";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import DeleteLikeButton from "./delete-like-button";

export default async function LikesTable({ userId }) {
  const allLike = await getLikesByUserId(userId, "postId", {
    _id: 1,
    "data.title": 1,
  });
  return (
    <section>
      <Table>
        <TableCaption>A list of your liked post(s)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[400px] text-center">Post(s)</TableHead>
            <TableHead className="text-center">Delete like</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allLike.map((like) => (
            <TableRow key={like._id}>
              <TableCell className="font-medium">
                <Link
                  className="hover:underline"
                  href={`/posts/${like.postId._id}`}
                >
                  {like.postId.title}{" "}
                </Link>
              </TableCell>
              <TableCell>
                <form className="w-full">
                  <DeleteLikeButton likeId={like._id} />
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Pencil2Icon } from "@radix-ui/react-icons";

export default function WriteButton() {
  return (
    <Button asChild className="rounded-2xl">
      <Link href={"/posts/write"}>
        <Pencil2Icon className="mr-2 h-4 w-4" />
        Write Now
      </Link>
    </Button>
  );
}

export function WriteButtonUserAvatar() {
  return (
    <Link
      href={"/posts/write"}
      className="flex w-full items-center justify-between"
    >
      <p>Write</p>
      <Pencil2Icon className="h-4 w-4" />
    </Link>
  );
}

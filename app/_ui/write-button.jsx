import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Pencil2Icon } from "@radix-ui/react-icons";

export default function WriteButton() {
  return (
    <Button asChild className="rounded-2xl">
      <Link href={"/posts/write"}>
        <Pencil2Icon className="w-4 h-4 mr-2" />
        Write Now
      </Link>
    </Button>
  );
}

export function WriteButtonUserAvatar() {
  return (
    <Link
      href={"/posts/write"}
      className="flex justify-between items-center w-full"
    >
      <p>Write</p>
      <Pencil2Icon className="w-4 h-4" />
    </Link>
  );
}

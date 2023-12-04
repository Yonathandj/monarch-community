import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PersonIcon } from "@radix-ui/react-icons";

export default function ProfileButton() {
  return (
    <Button asChild className="rounded-2xl">
      <Link href={"/users/profile"}>
        <PersonIcon className="mr-2 h-4 w-4" />
        Profile
      </Link>
    </Button>
  );
}

export function ProfileButtonUserAvatar() {
  return (
    <Link
      href={"/users/profile"}
      className="flex w-full items-center justify-between"
    >
      Profile
      <PersonIcon className="h-4 w-4" />
    </Link>
  );
}

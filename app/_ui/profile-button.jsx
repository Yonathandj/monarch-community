import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PersonIcon } from "@radix-ui/react-icons";

export default function ProfileButton() {
  return (
    <Button asChild className="rounded-2xl">
      <Link href={"/users/profile"}>
        <PersonIcon className="w-4 h-4 mr-2" />
        Profile
      </Link>
    </Button>
  );
}

export function ProfileButtonUserAvatar() {
  return (
    <Link
      href={"/users/profile"}
      className="flex justify-between items-center w-full"
    >
      Profile
      <PersonIcon className="w-4 h-4" />
    </Link>
  );
}

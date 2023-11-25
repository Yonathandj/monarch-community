import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Avatar className="w-14 h-14">
        <AvatarImage src="/monarch-logo.jpg" alt="Monarch Community Logo" />
        <AvatarFallback>MC</AvatarFallback>
      </Avatar>
    </Link>
  );
}

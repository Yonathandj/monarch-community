import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Logo() {
  return (
    <Link href={"/"}>
      <section className="w-16 h-auto">
        <AspectRatio ratio={4 / 3}>
          <Image
            fill
            className="rounded"
            src={"/monarch-logo.jpg"}
            alt="monarch community logo"
          />
        </AspectRatio>
      </section>
    </Link>
  );
}

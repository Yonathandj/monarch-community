import Link from "next/link";

import { Button } from "@/components/ui/button";

import { MixerVerticalIcon } from "@radix-ui/react-icons";

export default function SettingButton() {
  return (
    <Button asChild className="rounded-2xl">
      <Link href={"/setting"}>
        <MixerVerticalIcon className="mr-2 h-4 w-4" />
        Setting
      </Link>
    </Button>
  );
}

export function SettingButtonUserAvatar() {
  return (
    <Link
      href={"/setting"}
      className="flex w-full items-center justify-between"
    >
      Setting
      <MixerVerticalIcon className="h-4 w-4" />
    </Link>
  );
}

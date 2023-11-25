"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CameraIcon } from "@radix-ui/react-icons";

export default function WritePreviewSwitcher() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleCheckedChange = (checked) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    if (checked) {
      urlSearchParams.set("preview", checked);
    }
    if (!checked) {
      urlSearchParams.delete("preview");
    }
    replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <section className="flex gap-x-2 items-center">
      <Label htmlFor="preview-switcher">
        <CameraIcon className="w-6 h-6" />
      </Label>
      <Switch
        id="preview-switcher"
        defaultChecked={
          searchParams.get("preview")?.toString() === undefined
            ? false
            : searchParams.get("preview")?.toString() === "false"
            ? false
            : true
        }
        onCheckedChange={handleCheckedChange}
      />
    </section>
  );
}

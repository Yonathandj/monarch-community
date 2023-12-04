"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { FileTextIcon } from "@radix-ui/react-icons";

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
    <section className="flex items-center gap-x-2">
      <Label htmlFor="preview-switcher">
        <FileTextIcon className="h-6 w-6" />
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

"use client";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ImageIcon, PersonIcon } from "@radix-ui/react-icons";
const settingNavbarItems = [
  {
    title: "Preview",
    href: "/setting",
    icon: <ImageIcon className="mr-2 h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/setting/profile",
    icon: <PersonIcon className="mr-2 h-4 w-4" />,
  },
];

export function SettingNavbarMediumViewport() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-y-2">
      {settingNavbarItems.map((settingNavbarItem) => (
        <Link
          key={settingNavbarItem.href}
          href={settingNavbarItem.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === settingNavbarItem.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {settingNavbarItem.icon}
          {settingNavbarItem.title}
        </Link>
      ))}
    </nav>
  );
}

export function SettingNavbarSmallViewport() {
  const [valueSelect, setValueSelect] = useState("");
  const { push } = useRouter();
  return (
    <nav>
      <Select
        value={valueSelect}
        onValueChange={(value) => {
          setValueSelect(value);
          push(value);
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select navigation" />
        </SelectTrigger>

        <SelectContent>
          {settingNavbarItems.map((settingNavbarItem) => (
            <SelectItem
              key={settingNavbarItem.href}
              value={settingNavbarItem.href}
            >
              <section className="flex gap-x-1">
                {settingNavbarItem.icon}
                {settingNavbarItem.title}
              </section>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
}
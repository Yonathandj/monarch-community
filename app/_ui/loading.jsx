import { GearIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <section className="absolute bottom-0 left-0 right-0 top-0 z-40 rounded-xl bg-slate-50 opacity-80">
      <section className="flex h-full w-full items-center justify-center">
        <GearIcon className="h-6 w-6 animate-spin" />
      </section>
    </section>
  );
}

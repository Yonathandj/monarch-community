import { GearIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 z-40 opacity-80 bg-slate-400">
      <section className="w-full h-full flex justify-center items-center">
        <GearIcon className="w-6 h-6 animate-spin" />
      </section>
    </section>
  );
}

import { GearIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 z-40 opacity-80">
      <section className="w-full h-full flex justify-center items-center">
        <section className="bg-gray-200 rounded-full p-2">
          <GearIcon className="w-6 h-6 animate-spin" />
        </section>
      </section>
    </section>
  );
}

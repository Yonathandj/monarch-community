import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search() {
  return (
    <section className="relative w-64 sm:w-80">
      <Input
        type="text"
        placeholder="Search post"
        className="focus-visible:ring-0"
      />
      <MagnifyingGlassIcon className="absolute right-6 top-[6px] h-6 w-6" />
    </section>
  );
}

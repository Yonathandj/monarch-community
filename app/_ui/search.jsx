import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search() {
  return (
    <section className="relative w-64">
      <Input type="text" placeholder="Search post" className="focus-visible:ring-0"/>
      <MagnifyingGlassIcon className="absolute top-[6px] right-6 w-6 h-6" />
    </section>
  );
}
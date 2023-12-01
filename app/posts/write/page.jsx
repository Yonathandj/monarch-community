import Preview from "@/app/_ui/preview";
import WriteForm from "@/app/_ui/write-form";

export default async function Page({ searchParams: { preview } }) {
  return <main className="mt-6">{preview ? <Preview /> : <WriteForm />}</main>;
}

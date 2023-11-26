import WriteForm from "@/app/_ui/write-form";

export default function Page({ searchParams: { preview } }) {
  return (
    <main className="mt-6">{preview ? <h2>Preview</h2> : <WriteForm />}</main>
  );
}

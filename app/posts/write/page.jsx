import WriteForm from "@/app/_ui/write-form";

export default async function Page({ searchParams: { preview } }) {
  return (
    <main className="mt-6">{preview ? <h2>Test</h2> : <WriteForm />}</main>
  );
}

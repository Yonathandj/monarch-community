import WriteMode from "@/app/_ui/write-mode";

export default function Page({ searchParams: { preview } }) {
  return (
    <main className="mt-6">{preview ? <h2>Preview</h2> : <WriteMode />}</main>
  );
}

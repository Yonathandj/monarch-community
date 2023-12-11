import WriteForm from "@/app/_ui/write-form";
import PostPreview from "@/app/_ui/post-preview";

export default async function Page({ searchParams: { preview } }) {
  return (
    <main className="mt-6">{preview ? <PostPreview /> : <WriteForm />}</main>
  );
}

import WritePostForm from "@/app/_ui/write-post-form";
import PostPreview from "@/app/_ui/post-preview";

export default async function Page({ searchParams: { preview } }) {
  return (
    <main className="mt-6">
      {preview ? <PostPreview /> : <WritePostForm />}
    </main>
  );
}

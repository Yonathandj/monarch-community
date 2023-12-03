import PostDetail from "@/app/_ui/post-detail";

export default function Page({ params: { id } }) {
  return (
    <main className="mt-6">
      <PostDetail postId={id} />
    </main>
  );
}

import { auth } from "@clerk/nextjs";

import WriteForm from "@/app/_ui/write-form";

import { getUnpublishedPost } from "@/app/_lib/data";

export default async function Page({ searchParams: { preview } }) {
  const { userId } = auth();
  const unpublishedPost = await getUnpublishedPost(userId);

  return (
    <main className="mt-6">
      {preview ? (
        <h2>Test</h2>
      ) : (
        <WriteForm unpublishedPost={unpublishedPost} />
      )}
    </main>
  );
}

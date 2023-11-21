import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center items-center mt-10">
      <SignIn />
    </main>
  );
}

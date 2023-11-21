import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center items-center mt-5">
      <SignUp />
    </main>
  );
}

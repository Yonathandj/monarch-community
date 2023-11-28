import { SignUp } from "@clerk/nextjs";

export default function Page({ searchParams: { redirect_url } }) {
  return (
    <main className="flex justify-center items-center mt-5">
      <SignUp afterSignUpUrl={redirect_url || "/"} />
    </main>
  );
}

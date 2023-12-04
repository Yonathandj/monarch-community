import { SignUp } from "@clerk/nextjs";

export default function Page({ searchParams: { redirect_url } }) {
  return (
    <main className="mt-5 flex items-center justify-center">
      <SignUp afterSignUpUrl={redirect_url || "/"} />
    </main>
  );
}

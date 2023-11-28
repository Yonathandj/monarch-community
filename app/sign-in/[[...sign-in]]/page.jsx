import { SignIn } from "@clerk/nextjs";

export default function Page({ searchParams: { redirect_url } }) {
  return (
    <main className="flex justify-center items-center mt-10">
      <SignIn afterSignInUrl={redirect_url || "/"} />
    </main>
  );
}

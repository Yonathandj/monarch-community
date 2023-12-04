import { SignIn } from "@clerk/nextjs";

export default function Page({ searchParams: { redirect_url } }) {
  return (
    <main className="mt-10 flex items-center justify-center">
      <SignIn afterSignInUrl={redirect_url || "/"} />
    </main>
  );
}

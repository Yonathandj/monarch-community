import { SignIn } from "@clerk/nextjs";

export default function Page({ searchParams }) {
  console.log(searchParams);
  return (
    <main>
      <SignIn />
    </main>
  );
}

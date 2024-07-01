"use client";

import Login from "../../components/Login";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/lab/toolhub");
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-black'>
      <Login />
    </main>
  );
}

'use client'

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/pruebame");
    }
  }, [session, router]);

return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md rounded-lg border bg-black text-white px-6 pb-4 pt-8 shadow-md">
        <h1 className="mb-3 text-2xl font-bold text-center">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <div className="relative">
              <button onClick={() => signIn("google")} className="w-full border border-white rounded-lg py-2 px-4 mb-2 bg-black text-white hover:bg-gray-700">Sign in with Google</button>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <button onClick={() => signIn("github")} className="w-full border border-white rounded-lg py-2 px-4 bg-black text-white hover:bg-gray-700">Sign in with GitHub</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;
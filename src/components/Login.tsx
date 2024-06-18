"use client";

import React, { FormEventHandler, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [redirect, setRedirect] = useState<string>(null!);
  useEffect(() => {
    const url = new URL(window.location.href);
    const redirectUrl = url.searchParams.get("redirect") || "";
    setRedirect(redirectUrl);

    if (session) {
      router.push("/pruebame");
    }
  }, [session, router]);

  const onSubmitGoogle: FormEventHandler<HTMLFormElement> = async data => {
    data.preventDefault();

    const response = await signIn("google", {
      callbackUrl: redirect ? `${redirect}` : "/pruebame",
    });
  };

  return (
    <div className='w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-800 dark:bg-gray-900 sm:p-6 md:p-8'>
      <img
        className='mx-auto items-center justify-center'
        src='/img/saptiva-t.png'
        alt='saptiva'
        width={200}
      />
      <form className='space-y-6' action='#'>
        <h5 className='text-center text-xl font-medium text-gray-900 dark:text-white'>
          Welcome to our Lab
        </h5>

        <hr className='my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />

        <button
          onClick={() => signIn("google")}
          type='button'
          className='mb-2 me-2 inline-flex w-full items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55'
        >
          <svg
            className='me-2 h-4 w-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 19'
          >
            <path
              fillRule='evenodd'
              d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
              clipRule='evenodd'
            />
          </svg>
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("github")}
          type='button'
          className='mb-2 me-2 inline-flex w-full items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500'
        >
          <svg
            className='me-2 h-4 w-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
              clipRule='evenodd'
            />
          </svg>
          Sign in with Github
        </button>
      </form>
    </div>
  );

  return (
    <div className='flex min-h-screen items-center justify-center bg-black'>
      <div className='w-full max-w-md rounded-lg border bg-black px-6 pb-4 pt-8 text-white shadow-md'>
        <h1 className='mb-3 text-center text-2xl font-bold'>
          Please log in to continue.
        </h1>
        <div className='w-full'>
          <div>
            <div className='relative'>
              <button
                onClick={() => signIn("google")}
                className='mb-2 w-full rounded-lg border border-white bg-black px-4 py-2 text-white hover:bg-gray-700'
              >
                Sign in with Google
              </button>
            </div>
          </div>
          <div className='mt-4'>
            <div className='relative'>
              <button
                onClick={() => signIn("github")}
                className='w-full rounded-lg border border-white bg-black px-4 py-2 text-white hover:bg-gray-700'
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

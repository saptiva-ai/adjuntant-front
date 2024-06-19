"use client";

import React, {
  FormEventHandler,
  useEffect,
  useState,
  useCallback,
} from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faGoogle, faGithub, faCircleExclamation);

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [redirect, setRedirect] = useState<string>(null!);
  const [error, setError] = useState<boolean | false>(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const redirectUrl = url.searchParams.get("redirect") || "";
    setRedirect(redirectUrl);

    if (url.searchParams.get("error")) {
      setError(true);
    }

    if (session) {
      router.push("/lab/toolhub");
    }
  }, [session, router]);

  const onSubmitProvider = useCallback(
    async (provider: any) => {
      try {
        const response = await signIn(provider, {
          redirect: false,
          callbackUrl: redirect ? `${redirect}` : "/lab/toolhub",
        });

        if (response?.error) {
          setError(true);
          return;
        }

        router.push(response?.url || redirect);
      } catch (error) {
        setError(true);
      }
    },
    [router, redirect],
  );

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
          onClick={() => onSubmitProvider("google")}
          type='button'
          className='mb-2 me-2 inline-flex w-full items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55'
        >
          <FontAwesomeIcon
            className='text-white-500 group-hover:text-white-900 dark:text-white-400 h-5 w-5 flex-shrink-0 transition duration-75 dark:group-hover:text-white'
            icon={faGoogle}
          ></FontAwesomeIcon>
          <span className='ml-2'>Sign in with Google</span>
        </button>

        <button
          onClick={() => signIn("github")}
          type='button'
          className='mb-2 me-2 inline-flex w-full items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500'
        >
          <FontAwesomeIcon
            className='text-white-500 group-hover:text-white-900 dark:text-white-400 h-5 w-5 flex-shrink-0 transition duration-75 dark:group-hover:text-white'
            icon={faGithub}
          ></FontAwesomeIcon>
          <span className='ml-2'>Sign in with Github</span>
        </button>

        {error && (
          <div
            className='mb-4 flex items-center rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon>

            <div className='ml-2'>
              <span className='font-medium'>
                Invalid login, please validate your data
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

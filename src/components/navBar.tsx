"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

export default function NavBar({ session }: { session: any }) {
  return (
    <nav className='dark:bg-content1-900 border-gray-200 bg-content1'>
      <div className='max-w-screen-full mx-auto flex flex-wrap items-center justify-between p-2'>
        <div className='flex-1 justify-start'>
          <Image
            src='/img/saptiva-t.png'
            alt='saptiva'
            width={100}
            height={200}
          />
        </div>
        <div className='flex-2'>
          <Image
            id='avatarButton'
            data-dropdown-toggle='userDropdown'
            data-dropdown-placement='bottom-start'
            className='h-10 w-10 cursor-pointer rounded-full'
            src={session.user.image ?? "/img/user.png"}
            alt='User dropdown'
            width={30}
            height={30}
          />

          <div
            id='userDropdown'
            className='z-50 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
          >
            <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
              <div>{session.user.name ?? "User"}</div>
              <div className='truncate font-medium'>
                {session.user.email ?? ""}
              </div>
            </div>

            <div className='py-1'>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                onClick={async () => {
                  await signOut({
                    callbackUrl: "/login",
                    redirect: true,
                  });
                }}
              >
                Sign out
              </a>
            </div>
          </div>
        </div>

        <div
          className='hidden w-full md:block md:w-auto'
          id='navbar-default'
        ></div>
      </div>
    </nav>
  );
}

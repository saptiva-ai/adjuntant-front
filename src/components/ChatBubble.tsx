import { Avatar } from "@nextui-org/react";
import Image from "next/image";
export default function ChatBubble({
  user,
  message,
  image,
  dirChat,
  dirMessage,
  src,
}: {
  user: string;
  message: string;
  image?: string;
  dirChat: "ltr" | "rtl";
  dirMessage: "ltr" | "rtl";
  src?: string;
}) {
  return (
    <div className='flex gap-2.5 p-2' dir={dirChat}>
      <div className='w-10 flex-initial justify-items-center'>
        <Avatar isBordered showFallback radius='full' size='sm' src={src} />
      </div>

      <div className='w-auto flex-initial text-justify'>
        <div className='leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-3 dark:bg-gray-700'>
          <div className='mb-2 flex items-center space-x-2 rtl:space-x-reverse'>
            <span className='text-sm font-semibold text-gray-900 dark:text-white'>
              {user}
            </span>
          </div>
          <p
            className='text-sm font-extralight text-gray-900 dark:text-white'
            dir={dirMessage}
          >
            {message}
          </p>
          {image && (
            <div className='group relative my-2.5'>
              <div className='absolute flex h-full w-full items-center justify-center rounded-lg bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <button
                  data-tooltip-target='download-image'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:text-white'
                >
                  <svg
                    className='h-5 w-5 text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 18'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3'
                    />
                  </svg>
                </button>
                <div
                  id='download-image'
                  role='tooltip'
                  className='tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700'
                >
                  Download image
                  <div className='tooltip-arrow' data-popper-arrow></div>
                </div>
              </div>
              <Image
                src='/img/image-2.jpg'
                alt='Image description'
                className='rounded-lg'
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

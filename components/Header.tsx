'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useThemeProvider } from '@/context/ThemeContext'

export default function Header() {
  const { theme, setTheme } = useThemeProvider()

  return (
    <>
      <header className='relative z-[100] h-max w-full bg-gray-200 dark:bg-gray-800'>
        <nav className='mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 md:py-6 lg:px-0'>
          <div className='w-max'>
            <Link
              href='/'
              className='flex items-center justify-center gap-1 md:gap-2'
            >
              <Image
                src='/icon/crypticworld-logo.png'
                alt='Website Logo'
                height={48}
                width={48}
                className='aspect-auto h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'
              />
              <h1 className='text-xl font-bold text-gray-800 lg:text-2xl dark:text-gray-200'>
                Cryptic<span className='text-[--clr-bs-green]'>world</span>
              </h1>
            </Link>
          </div>
          <div className='flex w-max items-center justify-center gap-2 lg:gap-4'>
            <button
              type='button'
              id='toogle-theme-button'
              onClick={() =>
                theme === 'light' ? setTheme('dark') : setTheme('light')
              }
              className='flex cursor-pointer rounded-full border-gray-400 p-0.5 lg:min-w-12 lg:border lg:bg-gray-200 dark:border-gray-500 lg:dark:bg-gray-800'
            >
              <span className='sr-only'>Theme toogle button</span>
              <div className='relative flex w-max items-center justify-end rounded-full transition-all duration-300 ease-in-out dark:grow'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 -960 960 960'
                  className='block h-4 w-4 rounded-full bg-white fill-gray-800 transition-all duration-300 ease-in-out dark:hidden'
                >
                  <path d='M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z' />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 -960 960 960'
                  className='hidden h-4 w-4 rounded-full bg-black fill-gray-400 transition-all duration-300 ease-in-out dark:block'
                >
                  <path d='M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z' />
                </svg>
              </div>
            </button>
            <a
              href='https://github.com/blueorionn/crypticworld'
              target='_blank'
              rel='noopener noreferrer nofollow'
            >
              <span className='sr-only'>Github Profile</span>
              <svg
                className='h-4 w-4 fill-gray-500 transition-all hover:fill-gray-800 lg:h-5 lg:w-5 dark:fill-gray-400 dark:hover:fill-gray-200'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
                />
              </svg>
            </a>
            <a
              href='https://x.com/SSwadhinTandi'
              target='_blank'
              rel='noopener noreferrer nofollow'
            >
              <span className='sr-only'>Twitter Profile</span>
              <svg
                className='h-3 w-3 fill-gray-500 transition-all hover:fill-gray-800 md:h-4 md:w-4 dark:fill-gray-400 dark:hover:fill-gray-200'
                viewBox='0 0 1200 1227'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'></path>
              </svg>
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}

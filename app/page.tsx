import Image from 'next/image'
import Link from 'next/link'
import algorithms from '@/data/algorithms.json'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className='w-full'>
        <section
          className='w-full bg-gray-200 py-6 pb-12 md:py-9 md:pb-18 lg:py-12 lg:pb-24 dark:bg-gray-800'
          aria-label='secondary-header'
        >
          <div className='mx-auto max-w-5xl'>
            <h1 className='mx-auto w-max py-4 text-2xl font-bold text-gray-900 lg:py-6 lg:text-3xl dark:text-gray-200'>
              Cryptic World
            </h1>
            <h2 className='px-4 text-center text-base font-medium text-gray-700 lg:text-lg dark:text-gray-300'>
              Crypticworld is a lightweight web application built using Nextjs
              that allows users to hash any given text using a wide variety of
              hashing algorithms. This app is designed to support multiple
              encoding formats.
            </h2>
          </div>
        </section>
        <section className='w-full bg-gray-300 px-6 py-6 md:py-12 lg:py-18 dark:bg-gray-900'>
          <div className='mx-auto max-w-5xl'>
            <h2 className="w-max text-base font-semibold text-gray-700 after:absolute after:mt-1 after:block after:h-1 after:w-[10%] after:bg-gray-400 after:opacity-80 after:content-[''] md:text-lg md:after:w-[5%] lg:text-xl dark:text-gray-300 after:dark:bg-gray-700">
              Hash Text
            </h2>

            <div className='mt-6 grid grid-cols-2 gap-6 md:mt-9 md:grid-cols-4 md:gap-8 lg:mt-12'>
              {algorithms.map((algorithm) => {
                return (
                  <Link
                    href={algorithm.url}
                    key={algorithm.name}
                    className='rounded bg-gray-400 p-4 transition-all hover:scale-105 dark:bg-gray-700'
                  >
                    <span className='text-base text-gray-800 lg:text-lg dark:text-gray-300'>
                      {algorithm.title}
                    </span>
                  </Link>
                )
              })}
            </div>
            <div className='mt-6 grid grid-cols-2 gap-6 md:mt-9 md:grid-cols-4 md:gap-8 lg:mt-12'></div>
          </div>
          <div className='mt-6 flex w-full items-center justify-center py-6 md:mt-12 md:py-12 lg:mt-18 lg:py-18'>
            <div className='my-8 w-max'>
              <div className='mx-auto h-2 w-8 rounded bg-[--clr-bs-green] md:w-12 lg:w-16'></div>
              <div className='mx-auto py-4 md:py-6 lg:py-8'>
                <h1 className='text-center text-lg font-semibold text-gray-800 lg:text-xl dark:text-gray-300'>
                  See something missing?
                </h1>
                <h2 className='text-center text-base font-medium text-gray-700 md:mt-2 md:text-lg lg:text-xl dark:text-gray-400'>
                  Feel free to contribute to the code on my GitHub repository.
                </h2>
              </div>
              <div className='mt-4 flex flex-col items-center justify-center gap-2 md:mt-6 md:flex-row md:gap-4 lg:gap-8'>
                <a
                  href='https://github.com/blueorionn/crypticworld'
                  target='_blank'
                  className='flex items-center justify-center gap-4 rounded-full bg-gray-700 px-4 py-2 transition-all hover:bg-gray-600 md:px-8 md:py-4 dark:hover:bg-black'
                >
                  <Image
                    src='/icon/github-mark-white.png'
                    alt='Github logo'
                    height={24}
                    width={24}
                    className='aspect-auto h-4 w-4 lg:h-6 lg:w-6'
                  />
                  <span className='font-semibold text-gray-300'>
                    Contribute on Github
                  </span>
                </a>
                <a
                  href='https://x.com/SSwadhinTandi'
                  target='_blank'
                  className='flex items-center justify-center gap-4 rounded-full bg-gray-600 px-8 py-2 transition-all hover:bg-gray-700 md:px-16 md:py-4 dark:bg-black dark:hover:bg-gray-700'
                >
                  <span className='sr-only'>Twitter Profile</span>
                  <Image
                    src='/icon/x-logo.svg'
                    alt='Twitter/X logo'
                    height={16}
                    width={16}
                    className='aspect-auto h-2.5 lg:h-4'
                  />
                  <span className='font-semibold text-gray-300'>Follow Me</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useWindowWidth } from '@react-hook/window-size'
import { useSideBarProvider } from '@/context/SideBarContext'
import algorithms from '@/data/algorithms.json'
import { toggleSideBar } from '@/utils/index'

export default function SideBar({ hashUrl }: { hashUrl: string }) {
  const { isSideBarOpen, setIsSideBarOpen } = useSideBarProvider()
  const windowWidth = useWindowWidth()
  const lgWidth = 1280 // 1280px

  if (windowWidth >= lgWidth) return <DesktopSideBar hashUrl={hashUrl} />

  if (windowWidth < lgWidth)
    return (
      <MobileSideBar
        hashUrl={hashUrl}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
    )
}

export function MobileSideBar({
  hashUrl,
  isSideBarOpen,
  setIsSideBarOpen,
}: {
  hashUrl: string
  isSideBarOpen: boolean
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const closeSideBar = () => {
    setIsSideBarOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {isSideBarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.1 }}
            className={`fixed top-0 z-[100] min-h-[100vh] w-full max-w-[15rem] flex-col gap-4 bg-gray-300 px-8 py-6 shadow-md shadow-gray-400 brightness-105 transition-all duration-300 lg:max-w-xs lg:px-10 xl:relative xl:z-50 xl:flex dark:bg-slate-700 dark:shadow-none dark:brightness-90`}
          >
            <div className='my-3 flex w-full justify-end xl:my-0 xl:hidden'>
              <button
                type='button'
                className='cursor-pointer'
                onClick={() => toggleSideBar(isSideBarOpen, setIsSideBarOpen)}
              >
                <span className='sr-only'>Close Button</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 fill-gray-700 stroke-gray-700 dark:fill-gray-300 dark:stroke-gray-300'
                  viewBox='0 -960 960 960'
                >
                  <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'></path>
                </svg>
              </button>
            </div>
            <h2 className='my-4 text-lg font-bold text-gray-800 lg:text-xl dark:text-gray-300'>
              Hash
            </h2>
            <div className='flex flex-col'>
              {algorithms.map((algorithm) => {
                return (
                  <div className='w-full py-3' key={algorithm.name}>
                    <div className='flex items-center justify-between'>
                      <Link href={algorithm.url} onClick={closeSideBar}>
                        {algorithm.url === hashUrl ? (
                          <span className='text-base font-bold text-green-700 dark:text-green-400'>
                            {algorithm.title}
                          </span>
                        ) : (
                          <span className='text-base font-bold text-gray-700 dark:text-gray-300'>
                            {algorithm.title}
                          </span>
                        )}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export function DesktopSideBar({ hashUrl }: { hashUrl: string }) {
  return (
    <>
      <aside
        className={`fixed top-0 z-[100] min-h-[100vh] w-full max-w-[15rem] flex-col gap-4 bg-gray-300 px-8 py-6 shadow-md shadow-gray-400 brightness-105 transition-all duration-300 lg:max-w-xs lg:px-10 xl:relative xl:z-50 xl:flex dark:bg-slate-700 dark:shadow-none dark:brightness-90`}
      >
        <h2 className='my-4 text-lg font-bold text-gray-800 lg:text-xl dark:text-gray-300'>
          Hash
        </h2>
        <div className='flex flex-col'>
          {algorithms.map((algorithm) => {
            return (
              <div className='w-full py-3' key={algorithm.name}>
                <div className='flex items-center justify-between'>
                  <Link href={algorithm.url}>
                    {algorithm.url === hashUrl ? (
                      <span className='text-base font-bold text-green-700 dark:text-green-400'>
                        {algorithm.title}
                      </span>
                    ) : (
                      <span className='text-base font-bold text-gray-700 dark:text-gray-300'>
                        {algorithm.title}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}

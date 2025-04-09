'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaCheck } from 'react-icons/fa6'
import { MdOutlineContentCopy } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'
import { useSideBarProvider } from '@/context/SideBarContext'
import { useDebounce } from '@/hooks/useDebounce'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { checkAlgorithmSupport, toggleSideBar } from '@/utils/index'

export default function HashPage({ hash }: { hash: string }) {
  const pathname = usePathname()
  const [showOutputByte, setShowOutputByte] = useState<boolean>(false)
  const [outputByte, setOutputByte] = useState<number>(64)
  const [text, setText] = useState('')
  const debounceText = useDebounce(text, 300)
  const [hashedText, setHashedText] = useState('')
  const [copyState, setCopyState] = useState<boolean>(false)
  const { copy } = useCopyToClipboard()
  const { isSideBarOpen, setIsSideBarOpen } = useSideBarProvider()

  // handle text change
  useEffect(() => {
    async function handleText() {
      const res = await fetch(`/api/hash/${hash}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ text: debounceText, outputByte: outputByte }),
      })

      if (res.ok) {
        const data: { text: string; hashed: string } = await res.json()
        setHashedText(data.hashed)
      }
    }

    // call function
    if (debounceText !== '') handleText()
  }, [hash, debounceText, outputByte])

  // copyOutput
  const handleCopyOutput = () => {
    // timeoutId for 500ms
    setCopyState(true)
    const timeoutId = setTimeout(() => {
      setCopyState(false)
    }, 500)

    // copy hashedText(output)
    copy(hashedText)
    return () => clearTimeout(timeoutId)
  }

  // delete output
  const deleteOutput = () => {
    setHashedText('')
  }

  // special algoritms with variable output length
  useEffect(() => {
    if (
      ['shake_128', 'shake_256'].includes(
        pathname.split('/')[pathname.split('/').length - 1]
      )
    ) {
      setShowOutputByte(true)
    } else {
      setShowOutputByte(false)
    }
  }, [pathname])

  return (
    <>
      <section className='w-full flex-grow'>
        <div
          className='relative flex items-center justify-center bg-gray-200 py-4 brightness-95 dark:bg-gray-900 dark:brightness-150'
          aria-label='secondary-header'
        >
          <div className='absolute left-0 flex h-full items-center justify-center xl:relative xl:hidden'>
            <button
              type='button'
              className='cursor-pointer px-8'
              onClick={() => toggleSideBar(isSideBarOpen, setIsSideBarOpen)}
            >
              <span className='sr-only'>Menu Button</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 stroke-gray-800 dark:stroke-gray-300'
                viewBox='0 0 512 512'
              >
                <path
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  strokeWidth='48'
                  d='M88 152h336M88 256h336M88 360h336'
                />
              </svg>
            </button>
          </div>
          <div className='xl:my-6'>
            <h2 className='text-lg font-bold text-gray-800 md:text-xl lg:text-2xl dark:text-gray-300'>
              Hash String to {checkAlgorithmSupport(hash)?.title}
            </h2>
          </div>
        </div>
        <section>
          <div className='grid grid-rows-2 xl:grid-cols-2 xl:grid-rows-1'>
            <div className='h-full min-h-96 w-full overflow-hidden border-b-2 border-gray-300 xl:min-h-[56rem] xl:border-r-4 xl:border-b-0 dark:border-gray-700'>
              <div className='flex w-full items-center justify-start gap-8 border-y-2 border-gray-300 bg-gray-200 px-4 py-4 brightness-95 xl:px-8 dark:border-gray-800 dark:bg-gray-900 dark:brightness-[1.75]'>
                <span className='text-gray-800 dark:text-gray-300'>Input</span>
                {showOutputByte && (
                  <div className='flex items-center justify-center gap-2.5'>
                    <input
                      type='number'
                      name='length'
                      id='length'
                      className='h-4 w-32 rounded-sm border border-gray-300 bg-gray-200 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      min={0}
                      step={1}
                      onChange={(e) =>
                        setOutputByte(parseInt(e.currentTarget.value) || 64)
                      }
                      value={outputByte}
                      placeholder='64'
                    />
                    <span className='text-sm text-gray-700 dark:text-gray-400'>
                      Output Bytes
                    </span>
                  </div>
                )}
              </div>
              <textarea
                name='input'
                id='input'
                placeholder='Type your text here...'
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                className='h-full w-full resize-none overflow-auto bg-gray-200 p-6 text-base font-medium text-gray-900 outline-none xl:text-lg dark:bg-gray-900 dark:text-gray-200'
              ></textarea>
            </div>
            <div className='w-full'>
              <div className='flex w-full items-center justify-between border-y-2 border-gray-300 bg-gray-200 p-4 brightness-95 xl:px-8 dark:border-gray-800 dark:bg-gray-900 dark:brightness-[1.75]'>
                <span className='text-gray-800 dark:text-gray-300'>Output</span>
                <div className='flex items-center justify-center gap-4'>
                  <button
                    type='button'
                    className='cursor-pointer transition-all'
                    onClick={handleCopyOutput}
                  >
                    <span className='sr-only'>Copy Button</span>
                    {copyState ? (
                      <FaCheck className='fill-gray-700 dark:fill-gray-200' />
                    ) : (
                      <MdOutlineContentCopy className='fill-gray-700 dark:fill-gray-200' />
                    )}
                  </button>
                  <button
                    type='button'
                    className='cursor-pointer transition-all'
                    onClick={deleteOutput}
                  >
                    <span className='sr-only'>Delete Output</span>
                    <AiOutlineDelete className='fill-gray-700 dark:fill-gray-200' />
                  </button>
                </div>
              </div>
              <textarea
                name='output'
                id='output'
                disabled
                value={hashedText}
                className='h-full w-full cursor-default resize-none bg-gray-200 p-6 text-sm font-medium text-gray-950 outline-none xl:text-base dark:bg-gray-900 dark:text-gray-300'
              ></textarea>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

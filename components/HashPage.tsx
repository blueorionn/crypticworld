'use client'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { checkAlgorithmSupport } from '@/utils/index'

export default function HashPage({ hash }: { hash: string }) {
  const [text, setText] = useState('')
  const debounceText = useDebounce(text, 300)
  const [hashedText, setHashedText] = useState('')

  useEffect(() => {
    async function handleText() {
      const res = await fetch(`/api/hash/${hash}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ text: debounceText }),
      })

      if (res.ok) {
        const data: { text: string; hashed: string } = await res.json()
        setHashedText(data.hashed)
      }
    }

    // call function
    if (debounceText !== '') handleText()
  }, [hash, debounceText])

  return (
    <>
      <section className='w-full flex-grow'>
        <div
          className='relative flex items-center justify-center bg-gray-200 py-4 brightness-95 dark:bg-gray-900 dark:brightness-150'
          aria-label='secondary-header'
        >
          <div className='absolute left-0 flex h-full items-center justify-center xl:relative xl:hidden'>
            <button type='button' className='px-8'>
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
              <div className='w-full border-y-2 border-gray-300 bg-gray-200 px-4 py-4 brightness-95 xl:px-8 dark:border-gray-800 dark:bg-gray-900 dark:brightness-[1.75]'>
                <span className='text-gray-800 dark:text-gray-300'>Input</span>
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
              <div className='w-full border-y-2 border-gray-300 bg-gray-200 px-4 py-4 brightness-95 xl:px-8 dark:border-gray-800 dark:bg-gray-900 dark:brightness-[1.75]'>
                <span className='text-gray-800 dark:text-gray-300'>Output</span>
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

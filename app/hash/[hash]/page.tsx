import { notFound } from 'next/navigation'
import { SideBarProvider } from '@/context/SideBarContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HashPage from '@/components/HashPage'
import DynamicSideBar from '@/components/(sidebar)/DynamicSideBar'
import { generateHashUrl, checkAlgorithmSupport } from '@/utils'

// dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = await params

  if (checkAlgorithmSupport(hash)) {
    return {
      title: `${checkAlgorithmSupport(hash)?.title} - Crypticworld | Text Encrypter`,
    }
  }
}

// page
export default async function Page({
  params,
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = await params

  // if algorithm is unsupported
  if (!checkAlgorithmSupport(hash)) notFound()

  return (
    <>
      <Header />
      <main className='w-full'>
        <section className='relative flex w-full bg-gray-300 dark:bg-gray-900'>
          <SideBarProvider>
            <DynamicSideBar hashUrl={generateHashUrl(hash)} />
            <HashPage hash={hash} />
          </SideBarProvider>
        </section>
      </main>
      <Footer />
    </>
  )
}

import '~/styles/global.css'

import type { AppProps } from 'next/app'
import { IBM_Plex_Mono, Inter, PT_Serif } from '@next/font/google'
import { lazy, useEffect, useState } from 'react'
import Layout from '~/components/Layout'
import { useRouter } from 'next/router'
import Loading from '~/components/Loading'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const mono = IBM_Plex_Mono({
  variable: '--font-family-mono',
  subsets: ['latin'],
  weight: ['500', '700']
})

const sans = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800']
})

const serif = PT_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function App({
  Component,
  pageProps
}: AppProps<SharedPageProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { draftMode, token } = pageProps
  const router = useRouter()

  const isStudio = router.pathname.startsWith('/studio')

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
            --font-family-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      {isStudio ? (
        isLoading ? (
          <Loading />
        ) : (
          <Component {...pageProps} />
        )
      ) : isLoading ? (
        <Loading />
      ) : (
        <Layout>
          {draftMode ? ( // Use pageProps.draftMode to conditionally render the PreviewProvider
            <PreviewProvider token={token}>
              <Component {...pageProps} />
            </PreviewProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      )}
    </>
  )
}

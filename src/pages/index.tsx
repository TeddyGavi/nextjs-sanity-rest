import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'
import { CldVideoPlayer } from 'next-cloudinary'
import { useEffect, useRef } from 'react'

import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getVideo } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

// export const getStaticProps: GetStaticProps<
//   SharedPageProps & {
//     posts: Post[]
//   }
// > = async ({ draftMode = false }) => {
//   const client = getClient(draftMode ? { token: readToken } : undefined)
//   const posts = await getPosts(client)

//   return {
//     props: {
//       draftMode,
//       token: draftMode ? readToken : '',
//       posts
//     }
//   }
// }

type SanityVideoResponse = {
  url: string
  height: number
  width: number
  format: string
  public_id: string
}

export const getServerSideProps: GetServerSideProps<
  SanityVideoResponse
> = async () => {
  const {
    homeVid: { url, height, width, format, public_id }
  } = await getVideo()

  return { props: { url, height, width, format, public_id } }
}

export default function IndexPage({
  url,
  height,
  width
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="relative h-screen">
      <div className="absolute z-10 flex flex-col items-center justify-between font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 gap-14 text-teaGreen">
        <h1 className="text-4xl tracking-widest text-center  break-before-auto">
          Experience the Authentic Flavors of Vietnam at Taste of Saigon
        </h1>
        <Link
          href={'/menu'}
          className="px-6 py-1 tracking-wide border-2 border-teaGreen hover:text-darkMossGreenAlt hover:shadow-xl hover:border-darkMossGreen focus:ring-4"
        >
          See the Menu
        </Link>
      </div>
      <video
        height={height}
        width={width}
        src={`${url}`}
        className="object-cover w-full h-full border-none"
        title="video player of chef cooking"
        autoPlay
        loop
        muted
        playsInline
      ></video>
    </div>
  )
}

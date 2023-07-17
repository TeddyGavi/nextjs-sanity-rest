import { useEffect, useRef } from 'react'

import type {
  GetStaticProps,
  GetServerSideProps,
  InferGetServerSidePropsType
} from 'next'
import { CldVideoPlayer } from 'next-cloudinary'

import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getVideo } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import Link from 'next/link'

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
    <div className="h-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-between gap-14 font-bold  text-teaGreen z-10">
        <h1 className=" break-before-auto text-center text-4xl tracking-widest">
          Experience the Authentic Flavors of Vietnam at Taste of Saigon
        </h1>
        <Link
          href={'/menu'}
          className="border-2 px-6 py-1 tracking-wide border-teaGreen hover:text-darkMossGreenAlt hover:shadow-xl hover:border-darkMossGreen focus:ring-4"
        >
          See the Menu
        </Link>
      </div>
      <video
        height={height}
        width={width}
        src={`${url}`}
        className="border-none h-full w-full object-cover"
        title="video player of chef cooking"
        autoPlay
        loop
        muted
      ></video>
    </div>
  )
}

import type {
  GetStaticProps,
  GetServerSideProps,
  InferGetServerSidePropsType
} from 'next'
import muxBlurHash from '@mux/blurhash'
import MuxPlayer from '@mux/mux-player-react/lazy'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, getVideo } from '~/lib/sanity.queries'
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
type HomeVideo = {
  playbackId: string
  sourceWidth: number
  sourceHeight: number
  blurHashBase64: string
}

export const getServerSideProps: GetServerSideProps<{
  videoInfo: HomeVideo
}> = async () => {
  const {
    homeVid: {
      asset: { playbackId }
    }
  } = await getVideo()
  const { sourceWidth, sourceHeight, blurHashBase64 } = await muxBlurHash(
    playbackId
  )
  const videoInfo = {
    playbackId,
    sourceWidth,
    sourceHeight,
    blurHashBase64
  }

  return { props: { videoInfo } }
}

export default function IndexPage({
  videoInfo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <MuxPlayer
        loading="viewport"
        autoPlay="muted"
        loop
        playbackId={videoInfo.playbackId}
        style={{
          aspectRatio: `${videoInfo.sourceWidth}/${videoInfo.sourceHeight}`
        }}
        placeholder={videoInfo.blurHashBase64}
      />
    </>
  )
}

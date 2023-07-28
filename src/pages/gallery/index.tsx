import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import React from 'react'
import { SanityClient } from 'sanity'

import { getClient } from '~/lib/sanity.client'
import { getImageGallery, ImageWithAlt } from '~/lib/sanity.queries'

export const getStaticProps: GetStaticProps<{
  images: ImageWithAlt[]
}> = async () => {
  const images = await getImageGallery()
  return { props: { images }, fallback: "blocking", revalidate: 60}
}

export default function Contact({
  images
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const client = getClient()
  return (
    <section className="grid items-center w-full grid-flow-row grid-cols-1 mx-auto mt-16 md:grid-cols-3">
      {images.map((image, idx) => {
        return <MyImage key={idx} image={image} client={client} />
      })}
    </section>
  )
}

function MyImage({
  image,
  client
}: {
  image: ImageWithAlt
  client: SanityClient
}) {
  const imageProps = useNextSanityImage(client, image)
  return (
    <Image
      className={` p-4 aspect-[${imageProps.width}/${imageProps.height}
`}
      {...imageProps}
      alt={image.alt}
      placeholder="blur"
      blurDataURL={image.expandedAsset.metadata.lqip}
    />
  )
}

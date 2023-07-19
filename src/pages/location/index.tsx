import {
  IdentificationIcon,
  InboxIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { getImageDimensions } from '@sanity/asset-utils'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import React from 'react'

import { urlForImage } from '~/lib/sanity.image'
import {
  Address,
  CombinedRestaurantInfo,
  getSelectedRestInfo,
  ImageWithAlt,
  Link
} from '~/lib/sanity.queries'

export const ICON_SIZE = 40

export const getStaticProps: GetStaticProps<{
  info: CombinedRestaurantInfo
}> = async () => {
  const info = await getSelectedRestInfo()
  return { props: { info } }
}

export default function Location({
  info
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(info)
  return (
    <section className="mt-16">
      {/* <Logo image={info.logo} /> */}
      <div className="flex flex-col w-full gap-4 md:flex-row text-darkMossGreen">
        <Contact email={info.email} links={info.links} phone={info.phone} />
        <Address {...info.address} />
      </div>
    </section>
  )
}

function Contact({
  email,
  phone,
  links
}: {
  email: string
  phone: string
  links: Link[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold md:text-xl">Taste of Saigon</h3>
      <div className="flex">
        <IdentificationIcon
          className="self-start"
          height={ICON_SIZE}
          width={ICON_SIZE}
        />
        <ul className="flex flex-col gap-2">
          <li>{email}</li>
          <li>{phone}</li>
          {links.map((link, i) => {
            return (
              <>
                <li>
                  <a href={`${link.title}`}>{link.link}</a>
                </li>
                {/* <li>{link.title}</li> */}
                <li>{link.handle}</li>
              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Logo({ image }: { image: ImageWithAlt }) {
  const { height, width } = getImageDimensions(image)
  return (
    <Image
      src={urlForImage(image).height(height).width(width).url()}
      alt={image.alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    ></Image>
  )
}

function Address({ streetOrPO, postalCode, province, city }: Address) {
  return (
    <div className="flex flex-col gap-4 ">
      <h3 className="text-lg font-bold md:text-xl">Address</h3>
      <div className="flex">
        <MapPinIcon
          className="self-start"
          height={ICON_SIZE}
          width={ICON_SIZE}
        ></MapPinIcon>
        <div>
          <ul className="flex flex-col gap-2">
            <li>{city}</li>
            <li>{streetOrPO}</li>
            <li>{province}</li>
            <li>{postalCode}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

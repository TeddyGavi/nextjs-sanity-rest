import {
  ClockIcon,
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
  Hour,
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
  return (
    <section className="flex items-center justify-center h-screen font-sans text-md ">
      {/* <Logo image={info.logo} /> */}
      <div className="flex flex-col w-10/12 gap-8 mx-auto md:flex-row text-darkMossGreen">
        <Contact email={info.email} links={info.links} phone={info.phone} />
        <Address {...info.address} />
        <Hours hours={info.hours} />
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
    <div className="flex flex-col items-start w-full gap-4 md:w-2/3">
      <div className="flex w-full gap-2">
        <IdentificationIcon height={ICON_SIZE} width={ICON_SIZE} />
        <h3 className="self-start text-lg font-bold md:text-3xl">
          Taste of Saigon
        </h3>
      </div>
      <ul className="flex flex-col self-start gap-2">
        <li>{phone}</li>
        <li>
          <a href={`mailto:${email}?subject=contact-from-Saigon-website`}>
            {email}
          </a>
        </li>
        {links.map((link, i) => {
          return (
            <li key={i}>
              <a href={`${link.url}`}>{link.title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Logo({ image }: { image: ImageWithAlt }) {
  const { height, width } = getImageDimensions(image)
  return (
    <div className="">
      <Image
        className="w-screen opacity-10"
        src={urlForImage(image)
          .height(height)
          .width(width)
          .crop('center')
          .url()}
        alt={image.alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      ></Image>
    </div>
  )
}

function Address({ streetOrPO, postalCode, province, city }: Address) {
  return (
    <div className="flex flex-col items-start w-full gap-4 md:w-2/3">
      <div className="flex w-full gap-2">
        <MapPinIcon height={ICON_SIZE} width={ICON_SIZE}></MapPinIcon>
        <h3 className="text-lg font-bold md:text-3xl ">Address</h3>
      </div>
      <ul className="flex flex-col self-start gap-2">
        <li>{city}</li>
        <li>{streetOrPO}</li>
        <li>{province}</li>
        <li>{postalCode}</li>
      </ul>
    </div>
  )
}

function Hours({ hours }: { hours: Hour[] }) {
  return (
    <div className="flex flex-col w-full gap-4 md:w-2/3">
      <div className="flex w-full gap-2">
        <ClockIcon height={ICON_SIZE} width={ICON_SIZE} />
        <h3 className="text-lg font-bold md:text-3xl">Hours</h3>
      </div>
      <ul className="flex flex-col items-center justify-between w-full gap-2">
        {hours.map(({ day, opensAt, closesAt }) => {
          return (
            <li key={day} className="flex justify-between w-full">
              <span className="block mr-2">{day}: </span>
              <span className="block">
                {opensAt} - {closesAt}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

import {
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  IdentificationIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import SocialIcons from '~/components/SocialIcons'
import {
  Address,
  CombinedRestaurantInfo,
  getSelectedRestInfo,
  Hour,
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
    <section className="flex items-center justify-center h-full py-2 mt-16 font-sans md:h-screen text-md md:mt-0">
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
        <li className="flex gap-2 hover:underline hover:drop-shadow-xl">
          <a href={`mailto:${email}?subject=contact-from-Saigon-website`}>
            {email}{' '}
          </a>
          <ArrowTopRightOnSquareIcon
            height={ICON_SIZE / 2}
            width={ICON_SIZE / 2}
          />
        </li>
        {links.map((link, i) => {
          return (
            <li
              key={i}
              className="flex items-center justify-start gap-4 hover:underline hover:opacity-80 focus:opacity-80 hover:fill-teaGreen"
            >
              <SocialIcons title={link.title} isFooter={false} />
              <a className="items-start" href={`${link.url}`}>
                {link.title}
              </a>
            </li>
          )
        })}
      </ul>
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

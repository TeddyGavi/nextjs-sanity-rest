import { InboxIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import {
  Address,
  CombinedRestaurantInfo,
  getSelectedRestInfo
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
      <div className="flex justify-center w-full gap-4 text-darkMossGreen">
        <div></div>
        <Address {...info.address} />
      </div>
    </section>
  )
}

function Address({ streetOrPO, postalCode, province, city }: Address) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <h3 className="self-start text-lg font-bold md:text-xl">Address</h3>
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

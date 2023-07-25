import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { SanityClient } from 'next-sanity'
import { useNextSanityImage } from 'next-sanity-image'
import React from 'react'

import { getClient } from '~/lib/sanity.client'
import {
  CombinedMenuQuery,
  DrinkByCategory,
  Drinks,
  getMenu,
  ImageWithAlt,
  MenuItem
} from '~/lib/sanity.queries'

const imageResolver = (
  images: ImageWithAlt[],
  heading: string
): ImageWithAlt => {
  return images.find(image => image.title === heading)
}

export const getStaticProps: GetStaticProps<{
  menu: CombinedMenuQuery
}> = async () => {
  const menu = await getMenu()
  return { props: { menu } }
}

export default function Menu({
  menu
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const client = getClient()
  const headings = ['Bahn Mi', 'Pho', 'Mains', 'Drinks']

  return (
    <div className="">
      {headings.map((heading, i) => {
        return heading === 'Drinks' ? (
          <DrinkList
            client={client}
            key={menu.Drinks[0]._id}
            idx={i}
            drink={menu.drinksByCategory}
            image={imageResolver(menu.images, 'Drinks')}
            heading="Drinks"
          />
        ) : (
          <ItemWithImage
            client={client}
            idx={i}
            key={menu[heading][i]._id}
            items={menu[heading]}
            image={imageResolver(menu.images, heading)}
            heading={heading}
          />
        )
      })}
    </div>
  )
}

function ItemWithImage({
  client,
  items,
  idx,
  image,
  heading
}: {
  client: SanityClient
  idx: number
  items: MenuItem[]
  image: ImageWithAlt
  heading: string
}) {
  const imageProps = useNextSanityImage(client, image)
  const isEven = idx % 2 === 0
  return (
    <section
      className={` flex flex-col items-center lg:grid lg:grid-cols-2 lg:items-start`}
    >
      <h2 className="col-span-2 my-4 text-2xl font-semibold text-center underline lg:text-6xl text-darkMossGreen">
        {heading}
      </h2>
      <Image
        {...imageProps}
        className={`my-4 lg:m-4 aspect-[${imageProps.width}/${
          imageProps.height
        }] ${isEven && `lg:order-1`}`}
        alt={image.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={idx === 0}
        placeholder="blur"
        blurDataURL={image.assetEx.metadata.lqip}
      ></Image>
      <ul className="flex flex-col w-10/12 mx-auto lg:self-start">
        {items.map(({ _id, title, description, price }) => {
          return (
            <li
              key={_id}
              className="flex flex-col gap-2 mt-8 font-bold tracking-wide lg:gap-8 md:p-8 text-md lg:text-2xl break-before-auto text-darkMossGreen"
            >
              <span>{title}</span>
              <p className="font-serif text-lg font-normal tracking-wide text-darkMossGreenAlt break-before-auto">
                {description}
              </p>
              <span className="self-end">{price}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function DrinkList({
  client,
  drink,
  image,
  idx,
  heading
}: {
  client: SanityClient
  idx: number
  drink: DrinkByCategory[]
  image: ImageWithAlt
  heading: string
}) {
  const imageProps = useNextSanityImage(client, image)
  const isEven = idx % 2 === 0

  return (
    <section
      className={`flex flex-col items-center lg:grid lg:grid-cols-2 lg:items-start`}
    >
      <h2 className="col-span-2 my-4 text-2xl text-center underline lg:text-6xl text-darkMossGreen">
        {heading}
      </h2>
      <Image
        {...imageProps}
        className={`my-4 md:m-4 ${isEven && `lg:order-1`} aspect-[${
          imageProps.width
        }/${imageProps.height}]`}
        alt={image.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={image.assetEx.metadata.lqip}
      ></Image>
      <div aria-label="Drink list" className="w-full">
        {drink.map(({ _id, description, category, drinks }) => {
          return (
            <div key={_id} className="">
              <h3 className="flex flex-col items-center mt-4 mb-0 font-bold tracking-wide text-center text-md md:text-2xl text-darkMossGreenAlt">
                {category}
                <span className="italic font-normal text-md md:text-lg text-appleGreen">
                  {description}
                </span>
              </h3>
              <DrinkItem drinks={drinks} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function DrinkItem({ drinks }: { drinks: Drinks[] }) {
  return (
    <ul className="w-10/12 mx-auto items- ">
      {drinks.map(({ _id, title, price, priceTwo, category }) => {
        return (
          <li key={_id} className="w-10/12 p-1 mx-auto mt-1 md:p-2">
            <div className="flex justify-between font-serif text-lg tracking-wide md:text-xl break-before-auto text-darkMossGreen">
              <span>{title}</span>
              {priceTwo ? (
                <span>
                  {price} - {priceTwo}
                </span>
              ) : (
                <span>{price}</span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function Item({ items, heading }) {
  return (
    <section>
      <h2 className="mt-4 text-2xl text-center underline md:text-6xl text-darkMossGreen">
        {heading}
      </h2>
      <ul className="flex flex-col items-center justify-center w-10/12 mx-auto">
        {items.map(({ _id, title, description, price }) => {
          return (
            <li
              key={_id}
              className="flex flex-col items-center p-4 my-4 md:p-8"
            >
              <div className="inline-flex gap-8 font-mono font-bold tracking-wide text-md md:text-2xl break-before-auto text-darkMossGreen">
                <span>{title}</span>
                <span>{price}</span>
              </div>
              <p className="mt-4 font-serif text-lg tracking-wide text-darkMossGreenAlt break-before-auto">
                {description}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

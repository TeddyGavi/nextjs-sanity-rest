import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import {
  CombinedMenuQuery,
  DrinkByCategory,
  Drinks,
  getMenu,
  MenuItem
} from '~/lib/sanity.queries'

export const getStaticProps: GetStaticProps<{
  menu: CombinedMenuQuery
}> = async () => {
  const menu = await getMenu()
  return { props: { menu } }
}

export default function Menu({
  menu
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const headings = Object.keys(menu)
  return (
    <div className="mt-20">
      <Item items={menu['Bahn Mi']} heading={'Bahn Mi'} />
      <Item items={menu.Pho} heading={'Pho'} />
      <Item items={menu.Mains} heading={'Mains'} />
      <DrinkItem drink={menu.drinksByCategory} heading={'Drinks'} />
    </div>
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

function DrinkItem({
  drink,
  heading
}: {
  drink: DrinkByCategory[]
  heading: string
}) {
  return (
    <section>
      <h2 className="mt-4 text-2xl text-center underline md:text-6xl text-darkMossGreen">
        {heading}
      </h2>
      {drink.map(({ _id, description, category, drinks }) => {
        return (
          <div key={_id} className="">
            <h3 className="flex flex-col items-center mt-4 mb-0 font-bold tracking-wide text-center text-md md:text-2xl text-darkMossGreenAlt">
              {category}
              <span className="italic font-normal text-md md:text-lg text-appleGreen">
                {description}
              </span>
            </h3>
            <OneDrinkItem drinks={drinks} />
          </div>
        )
      })}
    </section>
  )
}

function OneDrinkItem({ drinks }: { drinks: Drinks[] }) {
  return (
    <ul className="flex flex-col items-center justify-center w-10/12 mx-auto">
      {drinks.map(({ _id, title, price, priceTwo, category }) => {
        return (
          <li key={_id} className="flex flex-col items-center p-1 mt-1 md:p-2">
            <div className="inline-flex gap-8 font-mono font-bold tracking-wide text-md md:text-xl break-before-auto text-darkMossGreen">
              <span>{title}</span>
              <span>{price}</span>
            </div>
            <p className="mt-4 font-serif text-lg tracking-wide text-darkMossGreenAlt break-before-auto">
              {/* {description} */}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

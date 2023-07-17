import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import {
  CombinedMenuQuery,
  MenuItem,
  getMenu,
  Drinks,
  DrinkByCategory
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
      <h2 className="text-center mt-4 text-2xl md:text-6xl text-darkMossGreen underline">
        {heading}
      </h2>
      <ul className="flex flex-col justify-center items-center w-10/12 mx-auto">
        {items.map(({ _id, title, description, price }) => {
          return (
            <li
              key={_id}
              className="flex flex-col items-center my-4 p-4 md:p-8"
            >
              <div className="font-mono font-bold inline-flex gap-8 text-md md:text-2xl break-before-auto tracking-wide text-darkMossGreen">
                <span>{title}</span>
                <span>{price}</span>
              </div>
              <p className="mt-4 text-darkMossGreenAlt font-serif text-lg break-before-auto tracking-wide">
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
      <h2 className="text-center mt-4 text-2xl md:text-6xl text-darkMossGreen underline">
        {heading}
      </h2>
      {drink.map(({ _id, description, category, drinks }) => {
        return (
          <div key={_id} className="">
            <h3 className="flex flex-col text-center items-center font-bold text-md md:text-lg  text-darkMossGreenAlt  tracking-wide mt-1 mb-0">
              {category}
              <span className="text-md font-normal text-appleGreen italic">
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
    <ul className="flex flex-col justify-center items-center w-10/12 mx-auto">
      {drinks.map(({ _id, title, price, priceTwo, category }) => {
        return (
          <li key={_id} className="flex flex-col items-center mt-1 p-1 md:p-8">
            <div className="font-mono font-bold inline-flex gap-8 text-md md:text-2xl break-before-auto tracking-wide text-darkMossGreen">
              <span>{title}</span>
              <span>{price}</span>
            </div>
            <p className="mt-4 text-darkMossGreenAlt font-serif text-lg break-before-auto tracking-wide">
              {/* {description} */}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

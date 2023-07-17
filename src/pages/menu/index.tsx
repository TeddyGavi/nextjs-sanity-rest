import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import {
  CombinedMenuQuery,
  MenuItem,
  getMenu,
  Drinks
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
  console.log(menu.Drinks)
  return (
    <div className="mt-20">
      <Item items={menu['Bahn Mi']} heading={headings[0]} />
      <Item items={menu.Pho} heading={headings[1]} />
      <Item items={menu.Mains} heading={headings[2]} />
      <DrinkItem drink={menu.Drinks} heading={headings[3]} />
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

function DrinkItem({ drink, heading }: { drink: Drinks[]; heading: string }) {
  const drinksByCategory = {}

  drink.forEach(drink => {
    const { category, ...drinkDetails } = drink
    if (drinksByCategory[category.title]) {
      drinksByCategory[category.title].push(drinkDetails)
    } else {
      drinksByCategory[category.title] = [drinkDetails]
    }
  })

  console.log(drinksByCategory)
  return <></>
}

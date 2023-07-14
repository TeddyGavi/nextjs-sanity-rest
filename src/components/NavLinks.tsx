import React from 'react'
import Link from 'next/link'

const links = [
  { name: 'Home', to: '/', id: 0 },
  { name: 'Menu', to: 'menu', id: 1 },
  { name: 'About', to: 'about', id: 2 },
  { name: 'Contact', to: 'contact', id: 3 },
  { name: 'Gallery', to: 'gallery', id: 4 }
]

export default function NavLinks() {
  return (
    <ul className="text-lg font-medium h-full justify-evenly flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {links.map(({ name, to, id }) => {
        return (
          <li
            key={id}
            className="block py-2 pl-3 pr-4 text-darkMossGreen hover:underline transition-all duration-300  md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
          >
            <Link href={to}>{name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

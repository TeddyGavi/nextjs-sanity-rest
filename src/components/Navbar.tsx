import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  function toggleScrollable() {
    isMenuOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }
  function openMenu() {
    setIsMenuOpen(prev => !prev)
    toggleScrollable()
  }
  return (
    <nav className="fixed top-0 z-20 w-full h-16 bg-white border-gray-200 divide-x shadow-md text-darkMossGreen dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Tate of Saigon
        </span>
        <button
          onClick={openMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center justify-center w-5 h-5 text-sm md:hidden focus:outline-none focus:ring-2 focus:ring-darkMossGreen dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          // aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <NavLinks />
        </div>
      </div>
      {isMenuOpen && <MobileMenu openMenu={openMenu} />}
    </nav>
  )
}

const links = [
  { name: 'Home', to: '/', id: 0 },
  { name: 'Menu', to: 'menu', id: 1 },
  { name: 'Location', to: 'location', id: 2 },
  { name: 'Contact', to: 'contact', id: 3 }
  // { name: 'Gallery', to: 'gallery', id: 4 }
]

type NavLinkProps = {
  isFooter?: boolean
}

export function NavLinks({ isFooter }: NavLinkProps) {
  return (
    <ul
      className={`text-lg font-medium h-full justify-evenly flex flex-col p-4 md:p-0 ${
        isFooter ? `mt-0` : `mt-4`
      }  md:flex-row md:space-x-8 md:mt-0 md:border-0`}
    >
      {links.map(({ name, to, id }) => {
        return (
          <li
            key={id}
            className={`block py-2 pl-3 pr-4 ${
              isFooter ? `text-white` : `text-darkMossGreen`
            } hover:underline transition-all duration-300  md:bg-transparent  md:p-0`}
          >
            <Link href={to}>{name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

type openMenuFn = {
  openMenu?: () => void
  isMenuOpen?: boolean
}

function MobileMenu({ openMenu }: openMenuFn) {
  return (
    <div
      onClick={() => openMenu()}
      className="absolute right-0 flex flex-col items-center w-full h-screen mx-auto bg-white z-100"
    >
      {/* <div className="flex flex-col items-center "> */}
      <NavLinks />
      {/* </div> */}
    </div>
  )
}

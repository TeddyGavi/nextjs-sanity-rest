import { useState } from 'react'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'

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
    <nav className=" bg-white text-darkMossGreen  border-gray-200 dark:bg-gray-900 shadow-md divide-x top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Tate of Siagon
        </span>
        <button
          onClick={openMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center w-5 h-5 justify-center text-sm text-gray-500  md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <NavLinks isMenuOpen openMenu={openMenu} />
        </div>
      </div>
      {isMenuOpen && <MobileMenu isMenuOpen openMenu={openMenu} />}
    </nav>
  )
}

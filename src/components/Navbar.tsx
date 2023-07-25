import Image from 'next/image'
import Link from 'next/link'
import { useNextSanityImage } from 'next-sanity-image'
import { useState } from 'react'
import { SanityClient } from 'sanity'

import { useDataContext } from '~/context/globalDataContext'
import { getClient } from '~/lib/sanity.client'
import { myLogo } from '~/lib/sanity.queries'

import Loading from './Loading'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { data, isLoading } = useDataContext()
  const client = getClient()

  function toggleScrollable() {
    isMenuOpen
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden')
  }
  function openMenu() {
    toggleScrollable()
    setIsMenuOpen(prev => !prev)
  }
  return (
    <nav className="fixed top-0 z-20 w-full h-16 bg-white border-gray-200 divide-x shadow-md text-darkMossGreen ">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Logo image={data.logo} client={client} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Tate of Saigon
              </span>
            </>
          )}
        </div>
        <button
          onClick={openMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center justify-center w-5 h-5 text-sm md:hidden focus:outline-none focus:ring-2 focus:ring-darkMossGreen focus:p-1"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
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
      {isMenuOpen && <MobileMenu openMenu={openMenu} isMenuOpen={isMenuOpen} />}
    </nav>
  )
}

const links = [
  { name: 'Home', to: '/', id: 0 },
  { name: 'Menu', to: 'menu', id: 1 },
  { name: 'Find Us', to: 'findus', id: 2 },
  { name: 'Gallery', to: 'gallery', id: 3 }
]

type NavLinkProps = {
  isFooter?: boolean
}

export function NavLinks({ isFooter }: NavLinkProps) {
  return (
    <ul
      className={`md:text-lg text-xl font-medium min-h-min flex justify-center p-4 md:p-0  ${
        isFooter ? `mt-0 flex-row` : `mt-2 flex-col md:flex-row`
      }  md:space-x-8 md:mt-0 md:border-0`}
    >
      {links.map(({ name, to, id }) => {
        return (
          <li
            key={id}
            className={`block my-8 md:my-0 md:py-2 pl-3 pr-4  ${
              isFooter ? `text-white` : `text-darkMossGreen`
            } hover:underline   md:bg-transparent  md:p-0 hover:drop-shadow-xl`}
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

function MobileMenu({ openMenu, isMenuOpen }: openMenuFn) {
  return (
    <div
      onClick={() => openMenu()}
      className={`absolute right-0 items-center flex flex-col w-full h-screen mx-auto bg-white z-100 `}
    >
      <NavLinks />
    </div>
  )
}

function Logo({ client, image }: { image: myLogo; client: SanityClient }) {
  const imageProps = useNextSanityImage(client, image)
  return (
    <div className="w-8 h-8 md:w-10 md:h-10">
      <Image
        {...imageProps}
        sizes="33vw"
        alt="Restaurant Logo"
        priority
        placeholder="blur"
        blurDataURL={image.asset.metadata.lqip}
      ></Image>
    </div>
  )
}

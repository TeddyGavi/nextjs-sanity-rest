import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useNextSanityImage } from 'next-sanity-image'
import { useState } from 'react'
import { SanityClient } from 'sanity'

import { useDataContext } from '~/context/globalDataContext'
import { getClient } from '~/lib/sanity.client'
import { myLogo } from '~/lib/sanity.queries'

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
    <nav
      aria-label="primary navigation menu"
      className="fixed top-0 z-20 w-full h-16 bg-white border-gray-200 divide-x shadow-md text-darkMossGreen "
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <></>
          ) : (
            <>
              <Logo image={data.logo} client={client} />
              <Link href={'/'}>
                <span className="self-center text-2xl font-semibold whitespace-nowrap hover:underline focus:underline">
                  Tate of Saigon
                </span>
              </Link>
            </>
          )}
        </div>
        <button
          onClick={openMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center justify-center w-5 h-5 text-sm md:hidden focus:outline-none focus:ring-2 focus:ring-darkMossGreen"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open navigation menu</span>
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
  const currentRoute = useRouter().pathname.substring(1)
  // console.log(currentRoute)
  return (
    <ul
      aria-label="navigation links"
      className={`md:text-lg text-2xl font-medium min-h-min flex justify-center p-4 md:p-0  ${
        isFooter ? `mt-0 flex-row` : `mt-2 flex-col md:flex-row`
      }  md:space-x-8 md:mt-0 `}
    >
      {links.map(({ name, to, id }) => {
        return (
          <li
            aria-current="page"
            key={id}
            className={`block my-8 md:my-0 md:py-2 pl-3 pr-4  ${
              isFooter ? `text-white` : `text-darkMossGreen`
            } hover:underline  md:p-0 hover:drop-shadow-xl ${
              currentRoute === to &&
              `border-b-2 hover:no-underline ${
                isFooter ? `border-white` : `border-darkMossGreen`
              } `
            }`}
          >
            <Link className={``} href={to}>
              {name}
            </Link>
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
      className={`absolute right-0 top-16 items-center justify-center flex flex-col w-full h-screen mx-auto bg-white z-100 `}
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

import { useRouter } from 'next/router'
import React from 'react'
import Wave from 'react-wavify'

import { useDataContext } from '~/context/globalDataContext'
import { Link } from '~/lib/sanity.queries'

import Loading from './Loading'
import { NavLinks } from './Navbar'

export default function Footer() {
  const path = useRouter().pathname
  const { data, isLoading, error } = useDataContext()

  if (path === '/') {
    return
  }

  return (
    <footer className="relative flex flex-col items-center justify-center w-full mt-20 bg-darkMossGreen ">
      <Wave
        className="absolute -top-20 -z-10"
        fill="#78B90F"
        paused={true}
        options={{
          height: 20,
          amplitude: 25,
          speed: 0.3,
          points: 8
        }}
      ></Wave>
      <Wave
        className="absolute -top-8 -z-10"
        fill="#45630C"
        paused={true}
        options={{
          height: 15,
          amplitude: 15,
          speed: 0.2,
          points: 6
        }}
      ></Wave>
      <div className="flex flex-col items-center justify-center my-4">
        <NavLinks isFooter={true} />
      </div>
      <div>{isLoading ? <Loading /> : <FooterLinks links={data.links} />}</div>
    </footer>
  )
}

function FooterLinks({ links }: { links: Link[] }) {
  return (
    <ul className="flex gap-4 mb-4 tracking-wide text-appleGreen">
      {links.map((link, i) => {
        return (
          <li key={i}>
            <a
              className=" hover:text-white hover:drop-shadow-lg"
              href={`${link.url}`}
            >
              {link.title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

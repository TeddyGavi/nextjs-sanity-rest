import { useRouter } from 'next/router'
import React from 'react'
import Wave from 'react-wavify'

import { NavLinks } from './Navbar'

export default function Footer() {
  const path = useRouter().pathname

  if (path === '/') {
    return
  }

  return (
    <footer className="relative mt-20 bg-darkMossGreen w-full flex flex-col items-center justify-center ">
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
      <div className="flex flex-col justify-center items-center my-4">
        <NavLinks isFooter={true} />
      </div>
      <div>socials</div>
    </footer>
  )
}

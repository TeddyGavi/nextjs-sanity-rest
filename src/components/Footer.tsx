import React from 'react'
import { NavLinks } from './Navbar'
import { useRouter } from 'next/router'
import Wave from 'react-wavify'

export default function Footer() {
  const path = useRouter().pathname

  if (path === '/') {
    return
  }

  return (
    <>
      <footer className="relative bg-darkMossGreen w-full flex flex-col items-center justify-center ">
        <Wave
          className="absolute -top-8 -z-10"
          fill="#45630C"
          paused={false}
          options={{
            height: 10,
            amplitude: 10,
            speed: 0.2,
            points: 6
          }}
        ></Wave>
        <div className="flex flex-col justify-center items-center my-4">
          <NavLinks isFooter={true} />
        </div>
        <div>socials</div>
      </footer>
    </>
  )
}

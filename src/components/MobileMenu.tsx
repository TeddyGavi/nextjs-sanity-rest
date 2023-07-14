import React from 'react'
import NavLinks from './NavLinks'

export type openMenuFn = {
  openMenu?: () => void
  isMenuOpen?: boolean
}

export default function MobileMenu({ openMenu }: openMenuFn) {
  return (
    <div
      onClick={() => openMenu()}
      className="absolute w-full right-0 mx-auto bg-white h-full flex flex-col items-center"
    >
      {/* <div className="flex flex-col items-center "> */}
      <NavLinks />
      {/* </div> */}
    </div>
  )
}

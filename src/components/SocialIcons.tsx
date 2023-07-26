import { MapPinIcon } from '@heroicons/react/24/outline'
import React from 'react'

import { Facebook, Instagram } from './svgIcons'

type SocialIconsProps = {
  title: string
  isFooter?: boolean
}
export default function SocialIcons({ title, isFooter }: SocialIconsProps) {
  title = title.toLowerCase()
  switch (title) {
    case 'facebook':
      return <Facebook isFooter={isFooter} />
    case 'instagram':
      return <Instagram isFooter={isFooter} />
    case 'google maps':
      return (
        <MapPinIcon
          className={`w-10 h-10 p-0 m-0 hover:opacity-80 focus:opacity-80 hover:text-teaGreen ${
            !isFooter && ``
          }`}
        />
      )
    default:
      break
  }
}

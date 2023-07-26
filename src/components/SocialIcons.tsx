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
          className={`w-8 h-8 p-0 m-0${
            isFooter
              ? `hover:opacity-80 focus:opacity-80 hover:text-teaGreen `
              : `self-start`
          }`}
        />
      )
    default:
      break
  }
}

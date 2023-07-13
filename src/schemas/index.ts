import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import bahnMi from './documents/bahnMi'
import drinkCategory from './documents/drinkCategory'
import drinks from './documents/drinks'
import noodleDishesRolls from './documents/noodleDishesRolls'
import pho from './documents/pho'
import restaurant from './documents/restaurant'
import siteSettings from './documents/siteSettings'
import address from './objects/address'
import menuItem from './objects/menuItem'
import social from './objects/social'

export const schemaTypes = [
  blockContent,
  bahnMi,
  menuItem,
  pho,
  noodleDishesRolls,
  drinks,
  address,
  siteSettings,
  restaurant,
  social,
  drinkCategory,
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    menuItem,
    bahnMi,
    pho,
    siteSettings,
    social,
    address,
    noodleDishesRolls,
    drinks,
    restaurant,
    drinkCategory,
  ],
}

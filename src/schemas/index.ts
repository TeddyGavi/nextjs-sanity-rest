import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import bahnMi from './documents/bahnMi'
import drinkCategory from './documents/drinkCategory'
import drinks from './documents/drinks'
import noodleDishesRolls from './documents/noodleDishesRolls'
import pho from './documents/pho'
import restaurant from './documents/restaurant'
import menuItem from './objects/menuItem'

export const schemaTypes = [
  blockContent,
  bahnMi,
  menuItem,
  pho,
  noodleDishesRolls,
  drinks,
  restaurant,
  drinkCategory,
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    menuItem,
    bahnMi,
    pho,
    noodleDishesRolls,
    drinks,
    restaurant,
    drinkCategory,
  ],
}

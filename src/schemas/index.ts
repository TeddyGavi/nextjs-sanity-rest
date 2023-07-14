import bahnMi from './documents/bahnMi'
import drinkCategory from './documents/drinkCategory'
import drinks from './documents/drinks'
import noodleDishesRolls from './documents/noodleDishesRolls'
import pho from './documents/pho'
import information from './documents/restaurant'
import siteSettings from './documents/siteSettings'
import address from './objects/address'
import dayAndTime from './objects/dayAndTime'
import menuItem from './objects/menuItem'
import social from './objects/social'

export const schemaTypes = [
  bahnMi,
  menuItem,
  pho,
  noodleDishesRolls,
  drinks,
  dayAndTime,
  address,
  siteSettings,
  information,
  social,
  drinkCategory
]
export const schema = {
  types: schemaTypes
}

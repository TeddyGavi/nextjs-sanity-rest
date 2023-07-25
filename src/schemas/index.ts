import bahnMi from './documents/bahnMi'
import drinkCategory from './documents/drinkCategory'
import drinks from './documents/drinks'
import menuPhotos from './documents/menuPhotos'
import noodleDishesRolls from './documents/noodleDishesRolls'
import pho from './documents/pho'
import information from './documents/restaurant'
import restGallery from './documents/restGallery'
import siteSettings from './documents/siteSettings'
import address from './objects/address'
import dayAndTime from './objects/dayAndTime'
import ImageGallery from './objects/ImageGallery'
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
  drinkCategory,
  menuPhotos,
  ImageGallery,
  restGallery
]
export const schema = {
  types: schemaTypes
}

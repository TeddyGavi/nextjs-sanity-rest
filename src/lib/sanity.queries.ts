import type { PortableTextBlock } from '@portabletext/types'
import type { Image, ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

import { getClient } from './sanity.client'

const client = getClient()

/* Queries */
const restInfoQuery = groq`*[_type == "information"]`
const siteSettings = groq`*[_type == "siteSettings"]`
const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
const muxVideoQuery = groq`*[_type == "information"][0]{
  homeVid{
    asset->{
      playbackId
      }
  }  
}`

const socialLinks = groq`*[_type == "information"][0]{
  links[]   
}`

const cloudinaryVideoQuery = groq`*[_type == "information"][0]{
  homeVid {
    url,
    height,
    format,
    width,
    public_id
  }  
}`
const drinkQuery = groq`*[_type == 'drinks'] {
  _id, 
  'title': item.title,
  'description': item.description,
  'price': item.price,
  'priceTwo': item.priceTwo,
  category->{'title': category, description}   
}`
const bahnMiQuery = groq`*[_type == 'bahnMi'] {
  _id, 
  'title': item.title, 
  'description': item.description,
  'price': item.price,
}`

const phoQuery = groq`*[_type == 'pho'] {
  _id, 
  'title': item.title,
  'description': item.description,
  'price': item.price,        
}`

const mainsQuery = groq`*[_type == 'mains'] {
  _id, 
  'title': item.title,
  'description': item.description,
  'price': item.price,    
}`
const combinedMenuQuery = groq`{
  "Bahn Mi": *[_type == 'bahnMi']{
    _id,
    'title': item.title,
    'description': item.description,
    'price': item.price
  },
  "Pho": *[_type == 'pho']{
    _id,
    'title': item.title,
    'description': item.description,
    'price': item.price
  },
  "Mains": *[_type == 'mains']{
    _id,
    'title': item.title,
    'description': item.description,
    'price': item.price
  },
  "Drinks": *[_type == 'drinks']{
    _id, 
    'title': item.title,
    'description': item.description,
    'price': item.price,
    'priceTwo': item.priceTwo,
    category->{'title': category, description}   
  },
  "drinksByCategory" : *[_type == "drinkCategory"] {
    category,
    _id,
    description,
    "drinks": *[_type == "drinks" && references(^._id)] {
      _id, 
      'title': item.title,
      'description': item.description,
      'price': item.price,
      'priceTwo': item.priceTwo,
      category->{'title': category, description}       
      }
  },
  "images": *[_type == "menuPhotos"][0].menuImages.images[] 
}`

const combinedRestaurantInfoQuery = groq`*[_type == "information"][0]{
  _id,
  'name':title,
  phone,
  email,
  logo,
  address{
    streetOrPO,
    province,
    city,
    postalCode,
  },
  hours[]{
    day,
    opensAt,
    closesAt,
  },
  links[]{
    url,
    title,
    handle,
  },
}`

const drinksByCategory = groq`*[_type == "drinkCategory"] {
category,
_id,
"drinks": *[_type == "drinks" && references(^._id)] {
  _id, 
  'title': item.title,
  'description': item.description,
  'price': item.price,
  'priceTwo': item.priceTwo,
  category->{'title': category, description}       
  }
}`

const restLogo = groq`*[_type == "information"]{logo}`

/* END QUERIES */

/* FUNCTIONS */
export async function getPosts(): Promise<Post[]> {
  return await client.fetch(postsQuery)
}
export async function getSocialLinks(): Promise<Link[]> {
  return await client.fetch(socialLinks)
}
export async function getAllRestInfo() {
  return await client.fetch(restInfoQuery)
}
export async function getSelectedRestInfo(): Promise<CombinedRestaurantInfo> {
  return await client.fetch(combinedRestaurantInfoQuery)
}
export async function getSiteSettings() {
  return await client.fetch(siteSettings)
}
export async function getRestLogo() {
  return await client.fetch(restLogo)
}
export async function getVideo() {
  return await client.fetch(cloudinaryVideoQuery)
}
export async function getMenu(): Promise<CombinedMenuQuery> {
  return await client.fetch(combinedMenuQuery)
}
export async function getPho() {
  return await client.fetch(phoQuery)
}
export async function getDrinks() {
  return await client.fetch(drinkQuery)
}
export async function getMains() {
  return await client.fetch(mainsQuery)
}
export async function getBahnMi() {
  return await client.fetch(bahnMiQuery)
}
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

/* TYPES  */

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}

export interface Hour {
  day: string
  opensAt: string
  closesAt: string
}

export interface Address {
  streetOrPO: string
  province: string
  city: string
  postalCode: string
}

export interface ImageWithAlt extends ImageAsset {
  alt?: string
  title?: string
}

export interface Link {
  url?: string
  title?: string
  handle?: string
}

export interface CombinedRestaurantInfo {
  _id: string
  name: string
  links: Link[]
  email: string
  phone: string
  logo: ImageWithAlt
  address: Address
  hours: Hour[]
}

interface Category {
  title: string
  description: string
}
export interface Drinks {
  _id: string
  title: string
  price: number
  priceTwo?: number
  category: Category
}

export interface MenuItem {
  _id: string
  title: string
  price: number
  description: string
}

export interface VideoQueryResponse {
  homeVid: {
    asset: {
      playbackId: string
    }
  }
}

export interface DrinkByCategory {
  _id: string
  category: string
  description: string
  drinks: Drinks[]
}

export interface CombinedMenuQuery {
  'Bahn Mi': MenuItem[]
  Pho: MenuItem[]
  Mains: MenuItem[]
  Drinks: Drinks[]
  drinksByCategory: DrinkByCategory[]
  images: ImageWithAlt[]
}
/* END TYPES */

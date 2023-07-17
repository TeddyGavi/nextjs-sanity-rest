import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
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
}`

const combinedRestuarantQuery = groq`*[_type == "information"][0]{
  _id,
  'name':Title,
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
    link,
    title,
    handle,
  },
  homeVid{
  asset->{
    ...,  
    "url": "https://stream.mux.com/" + playbackId}
  }  
}`
/* END QUERIES */

/* FUNCTIONS */
export async function getPosts(): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export async function getAllRestInfo() {
  return await client.fetch(restInfoQuery)
}
export async function getSelectedRestInfo() {
  return await client.fetch(combinedRestuarantQuery)
}
export async function getSitSettings() {
  return await client.fetch(siteSettings)
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

export interface CombinedMenuQuery {
  'Bahn Mi': MenuItem[]
  Pho: MenuItem[]
  Mains: MenuItem[]
  Drinks: Drinks[]
}
/* END TYPES */

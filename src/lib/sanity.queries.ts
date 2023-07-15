import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

/* Queries */
const restInfoQuery = groq`*[_type == "information"]`
const siteSettings = groq`*[_type == "siteSettings"]`
const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
const videoQuery = groq`*[_type == "information"]{
  homeVid{
    asset->{
      ...,  
	  	"url": "https://stream.mux.com/" + playbackId}
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
  "bahnMiItems": *[_type == 'bahnMi']{
    _id,
    'title': item.title,
    'description': item.description,
    'price': item.price
  },
  "phoItems": *[_type == 'pho']{
    _id,
    'title': item.title,
    'description': item.description,
    'price': item.price
  },
  "mainsItems": *[_type == 'mains']{
    _id,
    'title': item.title,
    'description': item.description,
    'price': item.price
  },
  "drinks": *[_type == 'drinks']{
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
export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export async function getAllRestInfo(client: SanityClient) {
  return await client.fetch(restInfoQuery)
}
export async function getSelectedRestInfo(client: SanityClient) {
  return await client.fetch(combinedRestuarantQuery)
}
export async function getSitSettings(client: SanityClient) {
  return await client.fetch(siteSettings)
}
export async function getVideo(client: SanityClient) {
  return await client.fetch(videoQuery)
}
export async function getMenu(client: SanityClient) {
  return await client.fetch(combinedMenuQuery)
}
export async function getPho(client: SanityClient) {
  return await client.fetch(phoQuery)
}
export async function getDrinks(client: SanityClient) {
  return await client.fetch(drinkQuery)
}
export async function getMains(client: SanityClient) {
  return await client.fetch(mainsQuery)
}
export async function getBahnMi(client: SanityClient) {
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
/* END TYPES */

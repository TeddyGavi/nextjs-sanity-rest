import { NextApiRequest, NextApiResponse } from 'next'

export default async function StaticMap(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // let staticMap = await fetch(
  //   `https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=${process.env.GOOGLE_STAIC_MAPS_API}&signature=${process.env.GOOGLE_STAIC_MAPS_SIGN_SECRET}`,
  //   {
  //     headers: { 'Content-Type': 'application/json' },
  //     cache: 'no-cache',
  //     credentials: 'same-origin'
  //   }
  // )
  // const resolve = await staticMap.json()
  // console.log(res)
  // console.log(staticMap)
  // res.json(staticMap)
  res.send('hi')
}

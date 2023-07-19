import { NextApiRequest, NextApiResponse } from 'next'

import { getSocialLinks } from '~/lib/sanity.queries'

export default async function Social(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const links = await getSocialLinks()
  res.json(links)
}

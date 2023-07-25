import { NextApiRequest, NextApiResponse } from 'next'

import { getSocialAndLogo } from '~/lib/sanity.queries'

export default async function Social(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const linkLogo = await getSocialAndLogo()
  res.json(linkLogo)
}

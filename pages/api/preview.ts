import { NextApiRequest, NextApiResponse } from 'next';

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({ token: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN });
  res.writeHead(307, { Location: '/' });
  res.end();
}

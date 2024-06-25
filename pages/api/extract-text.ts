import type { NextApiRequest, NextApiResponse } from 'next';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fileBuffer } = req.body;
    if (!fileBuffer) {
      return res.status(400).json({ message: 'No file buffer provided' });
    }

    const dataBuffer = Buffer.from(fileBuffer, 'base64');
    const data = await pdfParse(dataBuffer);
    return res.status(200).json({ text: data.text });
  } catch (error) {
    return res.status(500).json({ message: 'Error parsing PDF' });
  }
}

// This communicates with the storeFileUpload function
// in frontend-pse-e/components/uploadpopup.jsx
// TO DO: accept files larger than 1MB

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const responseData = { message: 'Hello from the API route!' };
    // Set the response status
    res.status(200).json(req.body);
}
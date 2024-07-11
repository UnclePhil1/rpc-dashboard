import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { programId } = req.query;

    if (!programId || typeof programId !== 'string') {
        return res.status(400).json({ error: 'Program ID is required and must be a string' });
    }

    try {
        const response = await axios.post('https://devnet.helius-rpc.com', {
            jsonrpc: "2.0",
            id: 1,
            method: "getProgramAccounts",
            params: [programId, { encoding: "jsonParsed" }]
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import 'dotenv/config'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { publicKey } = req.query;
    const API_KEY = process.env.HELIUS_API;

    if (!publicKey || typeof publicKey !== 'string') {
        return res.status(400).json({ error: 'Public key is required and must be a string' });
    }

    try {
        const response = await axios.post('https://devnet.helius-rpc.com', {
            jsonrpc: "2.0",
            id: 1,
            method: "getAccountInfo",
            params: [
                publicKey,
                { encoding: "jsonParsed" }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export default handler;

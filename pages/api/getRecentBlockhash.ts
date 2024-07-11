import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.post(
      "https://devnet.helius-rpc.com",
      {
        jsonrpc: "2.0",
        id: 1,
        method: "getRecentBlockhash",
        params: [],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HELIUS_API_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;

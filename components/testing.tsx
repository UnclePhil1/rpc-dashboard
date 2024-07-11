'use client';

import { useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const [publicKey, setPublicKey] = useState('');
    const [signature, setSignature] = useState('');
    const [programId, setProgramId] = useState('');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetch = async (endpoint: string, params: string) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.get(`/api/${endpoint}?${params}`);
            setData(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full'>
            <h1>Helius RPC Dashboard</h1>

            <div>
                <button onClick={() => handleFetch('getRecentBlockhash', '')} className='py-2 px-4 bg-green-400 text-sm m-2 hover:bg-green-500'>Get Recent Blockhash</button>
            </div>
            <div className='flex justify-start items-start p-4'>
                <input
                    type="text"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    placeholder="Enter public address"
                    className='border border-slate-500 w-[400px] rounded-lg mx-4 p-2'
                />
                <button onClick={() => handleFetch('getAccountInfo', `publicKey=${publicKey}`)} className='py-2 px-4 bg-blue-400 text-sm m-2 hover:bg-blue-500'>Get Account Info</button>
                <button onClick={() => handleFetch('getBalance', `publicKey=${publicKey}`)} className='py-2 px-4 bg-blue-400 text-sm m-2 hover:bg-blue-500'>Get Balance</button>
            </div>

            <div>
                <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Enter transaction signature"
                    className='border border-slate-500 w-[400px] rounded-lg mx-4 p-2'
                />
                <button onClick={() => handleFetch('getConfirmedTransaction', `signature=${signature}`)} className='py-2 px-4 bg-blue-400 text-sm m-2 hover:bg-blue-500'>Get Confirmed Transaction</button>
            </div>

            <div>
                <input
                    type="text"
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    placeholder="Enter program ID"
                    className='border border-slate-500 w-[400px] rounded-lg mx-4 p-2'
                />
                <button onClick={() => handleFetch('getProgramAccounts', `programId=${programId}`)} className='py-2 px-4 bg-blue-400 text-sm m-2 hover:bg-blue-500'>Get Program Accounts</button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data && (
                <div>
                    <h2>Data</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

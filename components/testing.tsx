'use client'

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
        <div>
            <h1>Helius RPC Dashboard</h1>

            <div className=''>
                <input
                    type="text"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    placeholder="Enter public address"
                    className=''
                />
                <button onClick={() => handleFetch('getAccountInfo', `publicKey=${publicKey}`)}>Get Account Info</button>
                <button onClick={() => handleFetch('getBalance', `publicKey=${publicKey}`)}>Get Balance</button>
            </div>

            <div>
                <button onClick={() => handleFetch('getRecentBlockhash', '')}>Get Recent Blockhash</button>
            </div>

            <div>
                <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Enter transaction signature"
                />
                <button onClick={() => handleFetch('getConfirmedTransaction', `signature=${signature}`)}>Get Confirmed Transaction</button>
            </div>

            <div>
                <input
                    type="text"
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    placeholder="Enter program ID"
                />
                <button onClick={() => handleFetch('getProgramAccounts', `programId=${programId}`)}>Get Program Accounts</button>
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

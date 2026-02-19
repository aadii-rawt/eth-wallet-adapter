
import { useAccount, useBalance, useConnect, useSendTransaction,  } from 'wagmi'
import { parseEther } from 'viem'
import { useState } from 'react'

const Wallet = () => {
    const { connectors, connect } = useConnect()
    const { address } = useAccount()

    const [sendAddress, setSendAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const balance = useBalance({
        address
    })

    const {data : hash, sendTransaction} = useSendTransaction()

    const handleSend = async () => {
        try {
            sendTransaction({ to : sendAddress, value: parseEther(amount) });
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const connectWallet = () => {
        connect({ connector: connectors?.[0] })
    }

    return (
        <main className="min-h-screen bg-black flex  items-start justify-center pt-16">

            <div className="w-[640px] space-y-6">

               {address && <div className='flex justify-between text-[#44A194]'>
                    <p>ETH {balance?.data?.formatted || 0}</p>
                    <p>{address?.slice(0, 10)}.......</p>
                </div>}
                {/* Recipient Input */}
                <div className="relative">
                    <input
                        type="text"
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        placeholder="Recipient's Solana Devnet address"
                        className="w-full bg-[#111111] border border-neutral-800 rounded-2xl 
                       px-6 py-6 text-lg text-neutral-300 placeholder-neutral-500
                       focus:outline-none focus:ring-1 focus:ring-neutral-700"
                    />

                </div>

                {/* Amount Input */}
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full bg-[#111111] border border-neutral-800 rounded-2xl 
                       px-6 py-6 text-lg text-neutral-300 placeholder-neutral-500
                       focus:outline-none focus:ring-1 focus:ring-neutral-700"
                    />

                </div>
                <div>
                    <button onClick={address ? handleSend : connectWallet} className="w-full bg-[#44A194] cursor-pointer border border-neutral-800 rounded-2xl 
                       px-6 py-6 text-lg text-neutral-300 placeholder-neutral-500
                       focus:outline-none focus:ring-1 focus:ring-neutral-700">
                        {address ? "Send " : "Connect Wallet"}
                    </button>
                </div>

            </div>
        </main>
    )
}

export default Wallet
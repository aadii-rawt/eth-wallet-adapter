import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { http, createConfig, WagmiProvider, useConnect, useAccount, useSendTransaction } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected, } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})
const client = new QueryClient()
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client} >
        <WalletConnector />
        <Send />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App


const WalletConnector = () => {
  const { connectors, connect } = useConnect()
  const {address} = useAccount()
  return (
    <>
    {address}
      {
        connectors.map((connector, i) => {
          console.log(connector);

          return (
            <button key={i} onClick={() => connect({ connector })}>
              <img src={connect?.icon} alt="" />{connector.name}</button>

          )
        }
        )
      }
    </>
  )
}

const Send = () => {

  const {data : hash , sendTransaction} = useSendTransaction();
  const [address,setAddress] = useState("")
  const [amount,setAmount] = useState(0);

  const handleSend = () => {
    sendTransaction({
      to : address,
      value : (amount * 1000000000000000000).toString()
    
    })
  }
  return (
    <div>
      <input type="text" placeholder='enter your address' value={address} onChange={(e) => setAddress(e.target.value)} />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='amount' />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}
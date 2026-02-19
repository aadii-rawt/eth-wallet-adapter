import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider,  } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected, } from 'wagmi/connectors'
import Wallet from './wallet'


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
        <Wallet />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App

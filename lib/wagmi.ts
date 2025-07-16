import { http, createConfig } from "wagmi"
import { injected, metaMask, walletConnect } from "wagmi/connectors"
import { defineChain } from "viem"

// Define BNB Smart Chain Testnet chain
const bnbSmartChainTestnet = defineChain({
  id: 97,
  name: 'BNB Smart Chain Testnet ',
  network: 'bnb-smart-chain-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-testnet-rpc.publicnode.com/'],
    },
    public: {
      http: ['https://bsc-testnet-rpc.publicnode.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BNB Smart Chain Testnet Explorer',
      url: 'https://testnet.bscscan.com',
    },
  },
  testnet: true,
})

// Get WalletConnect project ID from environment or use a fallback
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

console.log("Wagmi config: WalletConnect project ID:", walletConnectProjectId ? "Set" : "Not set")

const connectors = [
  injected(),
  metaMask(),
  ...(walletConnectProjectId ? [
    walletConnect({
      projectId: walletConnectProjectId,
      metadata: {
        name: "H4B Platform",
        description: "H4B Freelance and Bounty Platform",
        url: typeof window !== 'undefined' ? window.location.origin : 'https://h4b.com',
        icons: ['https://h4b.com/icon.png']
      }
    })
  ] : []),
]

console.log("Wagmi config: Available connectors:", connectors.map(c => c.name))

export const config = createConfig({
  chains: [bnbSmartChainTestnet], // ✅ Set chain to BNB Smart Chain Testnet
  connectors,
  transports: {
    [bnbSmartChainTestnet.id]: http(), // ✅ Use default RPC for BNB Smart Chain Testnet
  },
})
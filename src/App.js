import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import Routing from "./Routing";
import { ProfileProvider } from "./context/ProfileProvider";
import Loading from "./customComponent/Loading";
import LoaderHelper from "./customComponent/Loading/LoaderHelper";
import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useNetwork,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const bsc = {
  id: 56,
  name: "BSC",
  network: "BNB Smartchain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://bsc-dataseed2.defibit.io",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
  testnet: false,
};

const bscTestnet = {
  id: 97,
  name: "BSC Testnet",
  network: "BNB Smartchain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bscTestnet.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
    <ProfileProvider>
      <Routing />
      <Loading ref={ref => LoaderHelper.setLoader(ref)} />
    </ProfileProvider>
      </RainbowKitProvider>
    </WagmiConfig>
      
  );
}

export default App;

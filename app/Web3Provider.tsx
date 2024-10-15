import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, scroll } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from 'react';

interface Web3ProviderProps {
  children: ReactNode;
}


const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, scroll],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
      ),
      [scroll.id]: http(
        `https://rpc.scroll.io`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Pencil Protocol",

    // Optional App Info
    appDescription: "The best liquidity pools",
    appUrl: "app.pencilsprotocol.io", // your app's url
    appIcon: "https://app.pencilsprotocol.io/static/media/black-logo.1a419ba6b97968dac1b0.webp", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
                <ConnectKitProvider 
                customTheme={{"--ck-accent-color": "#e6f2ff", "--ck-accent-text-color": "#003366",}}>
                    {children}
                </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
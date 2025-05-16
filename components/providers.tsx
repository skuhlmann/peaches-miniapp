"use client";

import { MiniAppProvider } from "@/contexts/miniapp-context";
import { env } from "@/lib/env";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import dynamic from "next/dynamic";
import farcasterFrame from "@farcaster/frame-wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";

import { injected } from "wagmi/connectors";
import { HAUS_RPC_DEFAULTS } from "@/lib/constants";

const ErudaProvider = dynamic(
  () => import("../components/Eruda").then((c) => c.ErudaProvider),
  { ssr: false }
);

export const config = createConfig({
  chains: [base],
  // chains: [sepolia],
  transports: {
    [base.id]: http(HAUS_RPC_DEFAULTS["0x2105"]),
    // [sepolia.id]: http(HAUS_RPC_DEFAULTS["0xaa36a7"]),
  },
  connectors: [farcasterFrame(), injected()],
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErudaProvider>
      <MiniKitProvider
        projectId={env.NEXT_PUBLIC_MINIKIT_PROJECT_ID}
        notificationProxyUrl="/api/notification"
        // @ts-expect-error
        // chain={sepolia}
        chain={base}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <MiniAppProvider>{children}</MiniAppProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MiniKitProvider>
    </ErudaProvider>
  );
}

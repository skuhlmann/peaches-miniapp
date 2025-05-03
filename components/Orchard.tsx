"use client";

import { useAccount } from "wagmi";
import BuyTrees from "./BuyTrees";
import { useAccountTrees } from "@/hooks/use-account-trees";
import Link from "next/link";

export default function Orchard() {
  const { isConnected, address } = useAccount();
  const { accountNfts } = useAccountTrees({ accountAddress: address || "" });

  return (
    <div className="container mx-auto px-4 py-6">
      {!isConnected ? (
        <BuyTrees />
      ) : (
        <div>
          <h2 className="text-lg mb-4">Your Trees</h2>
          {accountNfts && accountNfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accountNfts.map((nft) => (
                <Link
                  key={nft.tokenID}
                  href={`/tree/${nft.tokenID}`}
                  className="block"
                >
                  <div className="bg-brand-green/20 p-4 rounded-lg hover:bg-brand-green/30 transition-colors">
                    <p className="font-bold">Tree #{nft.tokenID}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-orange">
              Nice Dirt!! Put some trees in it.
            </p>
          )}
          <div className="mt-4">
            <BuyTrees />
          </div>
        </div>
      )}
    </div>
  );
}

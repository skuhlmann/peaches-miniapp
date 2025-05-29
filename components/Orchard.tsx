"use client";

import { useAccount } from "wagmi";
import BuyTrees from "./BuyTrees";
import { useAccountTrees } from "@/hooks/use-account-trees";
import TreeCard from "./TreeCard";
import { useState, useEffect } from "react";

export default function Orchard() {
  const { isConnected, address } = useAccount();
  const { accountNfts } = useAccountTrees({ accountAddress: address || "" });
  const [activeTab, setActiveTab] = useState<"buy" | "trees">("buy");

  console.log("address", address);

  useEffect(() => {
    if (accountNfts && accountNfts.length > 0) {
      setActiveTab("trees");
    } else {
      setActiveTab("buy");
    }
  }, [accountNfts]);

  useEffect(() => {
    const handleSwitchToTreesTab = () => {
      setActiveTab("trees");
    };

    window.addEventListener("switchToTreesTab", handleSwitchToTreesTab);
    return () => {
      window.removeEventListener("switchToTreesTab", handleSwitchToTreesTab);
    };
  }, []);

  if (!isConnected) {
    return <BuyTrees />;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <div>
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("buy")}
            className={`${
              activeTab === "buy"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Buy Trees
          </button>
          <button
            onClick={() => setActiveTab("trees")}
            className={`${
              activeTab === "trees"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Your Trees
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "buy" ? (
          <BuyTrees />
        ) : (
          <div>
            {accountNfts && accountNfts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accountNfts.map((nft) => (
                  <TreeCard key={nft.tokenID} nft={nft} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-orange">
                Nice Dirt!! Put some trees in it.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

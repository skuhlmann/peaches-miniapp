"use client";

import { useAccount } from "wagmi";
import BuyTrees from "./BuyTrees";
import { useAccountTrees } from "@/hooks/use-account-trees";
import TreeCard from "./TreeCard";
import { useState, useEffect } from "react";
import { useAccountPeaches } from "@/hooks/use-account-peaches";
import PeachCard from "./PeachCard";

export default function Orchard() {
  const { isConnected, address } = useAccount();
  const { accountNfts } = useAccountTrees({ accountAddress: address || "" });
  const { accountNfts: peachNfts } = useAccountPeaches({
    accountAddress: address || "",
  });

  const [activeTab, setActiveTab] = useState<"buy" | "trees" | "peaches">(
    "buy"
  );

  useEffect(() => {
    if (peachNfts && peachNfts.length > 0) {
      setActiveTab("peaches");
    } else {
      setActiveTab("buy");
    }
  }, [peachNfts]);

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
            Buy Peaches
          </button>
          <button
            onClick={() => setActiveTab("peaches")}
            className={`${
              activeTab === "peaches"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Your Peaches
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
        {activeTab === "buy" && <BuyTrees />}

        {activeTab === "trees" && (
          <div>
            {accountNfts && accountNfts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accountNfts.map((nft) => (
                  <TreeCard key={nft.tokenID} nft={nft} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-orange">
                Tree sales have closed for the season. You can buy individual
                peach boxes from farmers.
              </p>
            )}
          </div>
        )}

        {activeTab === "peaches" && (
          <div>
            {peachNfts && peachNfts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {peachNfts.map((nft) => (
                  <PeachCard key={nft.tokenID} nft={nft} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-orange">
                You&apos;re short on fuzz.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

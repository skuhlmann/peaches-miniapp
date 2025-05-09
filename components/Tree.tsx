"use client";

import { useTreeNft } from "@/hooks/use-tree-nft";
import { useParams } from "next/navigation";
import TreeCard from "./TreeCard";

export default function Tree() {
  const params = useParams();
  const tokenId = params.tokenId as string;
  const { treeNft, isLoading, error } = useTreeNft({ tokenId });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p>Loading tree...</p>
      </div>
    );
  }

  if (error || !treeNft) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-red-500">Error loading tree</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <TreeCard nft={treeNft} />

      {treeNft.tokenMetadata?.attributes && (
        <div className="mt-8 bg-brand-gray p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Tree Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treeNft.tokenMetadata.attributes.map((attr, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg">
                <p className="text-brand-orange font-medium mb-1">
                  {attr.trait_type}
                </p>
                <p className="text-white">{attr.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

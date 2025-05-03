"use client";

import { useTreeNft } from "@/hooks/use-tree-nft";
import { useParams } from "next/navigation";

export default function TreePage() {
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
      <div className="bg-brand-green/20 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Tree #{treeNft.tokenID}</h1>
        {treeNft.tokenMetadata && (
          <div>
            {treeNft.tokenMetadata.image && (
              <img
                src={treeNft.tokenMetadata.image}
                alt={`Tree ${treeNft.tokenID}`}
                className="w-full h-auto rounded-lg mb-4"
              />
            )}
            <p className="text-sm mb-2">{treeNft.tokenMetadata.description}</p>
            {treeNft.tokenMetadata.attributes && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Attributes</h2>
                <div className="grid grid-cols-2 gap-2">
                  {treeNft.tokenMetadata.attributes.map((attr, index) => (
                    <div key={index} className="bg-white/10 p-2 rounded">
                      <p className="text-sm font-medium">{attr.trait_type}</p>
                      <p className="text-sm">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

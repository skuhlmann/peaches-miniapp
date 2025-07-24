"use client";

import { useParams } from "next/navigation";
import TreeCard from "./TreeCard";
import Link from "next/link";
import { usePeachNft } from "@/hooks/use-peach-nft";
import PeachCard from "./PeachCard";

export default function Peach() {
  const params = useParams();
  const tokenId = params.tokenId as string;
  const { peachNft, isLoading, error } = usePeachNft({ tokenId });

  console.log("peachNft", peachNft);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-2">
        <p>Loading peach...</p>
      </div>
    );
  }

  if (error || !peachNft) {
    return (
      <div className="container mx-auto px-4 py-2">
        <p className="text-red-500">Error loading peach</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <nav className="-mb-px flex space-x-8 mb-6">
        <Link
          href={`/orchard`}
          className="text-brand-orange py-2 px-1 font-medium text-sm border-b-2 border-brand-orange"
        >
          Back to Orchard
        </Link>
      </nav>
      <PeachCard nft={peachNft} />

      {peachNft.tokenMetadata?.attributes && (
        <div className="mt-8 bg-brand-gray p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Peach Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {peachNft.tokenMetadata.attributes.map((attr, index) => (
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

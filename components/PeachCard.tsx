/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import sdk from "@farcaster/frame-sdk";
import Link from "next/link";
import { useParams } from "next/navigation";
import { peachState } from "@/lib/helpers";

interface TokenMetadata {
  name: string;
  description?: string;
  image?: string;
  attributes: Array<{ [key: string]: any }>;
  status?: string;
}

interface TokenBalance {
  contractAddress: string;
  tokenID: string;
  tokenMetadata?: TokenMetadata;
}

interface PeachCardProps {
  nft: TokenBalance;
  children?: React.ReactNode;
}

export const dhImagePath = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("/ipfs/")[1]}`;
};

const PeachCard: React.FC<PeachCardProps> = ({ nft }) => {
  const { tokenID, tokenMetadata } = nft;
  const params = useParams();

  const handleCastPeach = useCallback(async () => {
    console.log("casting");

    await sdk.actions.composeCast({
      text: "Soon I'll be eating fresh Palisade Peaches!",
      embeds: [`https://miniapp.paeachtycoon.com/api/peach/${tokenID}`],
    });
  }, [tokenID]);

  return (
    <div className="flex flex-col items-center bg-brand-gray p-4 rounded-lg">
      <div className="w-full mb-2">
        {params.tokenId ? (
          <p className="text-brand-white text-xs">{tokenMetadata?.name}</p>
        ) : (
          <Link
            href={`/peach/${tokenID}`}
            className="text-brand-orange underline text-xs"
          >
            {tokenMetadata?.name}
          </Link>
        )}
      </div>
      <div className="flex flex-row w-full gap-4">
        {tokenMetadata?.image ? (
          <img
            src={dhImagePath(tokenMetadata.image)}
            alt={tokenMetadata.name || `Peach ${tokenID}`}
            className="w-full h-auto rounded-lg mb-2"
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            <img
              src="/images/peach_fallback.png"
              alt="Peach Reveal Coming Soon"
              className="w-full h-auto rounded-lg mb-2"
            />
            {tokenMetadata?.status === "REFRESHING" && (
              <p className="text-brand-orange text-sm text-center">
                Peach art will be revealed soon!
              </p>
            )}
          </div>
        )}
      </div>
      {nft.tokenMetadata?.attributes && (
        <h2 className="text-lg font-semibold mb-1">
          {peachState(nft.tokenMetadata.attributes)}
        </h2>
      )}
      <button
        onClick={handleCastPeach}
        className="flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-2 rounded-full mt-3 mb-4 hover:bg-brand-green/90 transition-colors"
      >
        Cast Me
      </button>

      <div className="mt-4 text-brand-orange text-xl font-bold text-center w-full">
        Open, redeem and/or sell your peaches in the marketplace.
      </div>

      <a
        href="https://peachtycoon.com/#/market"
        target="_blank"
        className="flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-2 rounded-full mt-3 mb-4 hover:bg-brand-orange/90 transition-colors"
      >
        Peach Market
      </a>

      {/* <TreeBoosts tokenId={tokenID} /> */}
    </div>
  );
};

export default PeachCard;

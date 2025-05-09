/* eslint-disable @next/next/no-img-element */
import { truncateAddress } from "@/lib/helpers";
import React, { useCallback } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import sdk from "@farcaster/frame-sdk";
import Link from "next/link";

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

interface TreeCardProps {
  nft: TokenBalance;
  children?: React.ReactNode;
}

export const dhImagePath = (path?: string) => {
  if (!path) return;
  return `https://daohaus.mypinata.cloud/ipfs/${path.split("/ipfs/")[1]}`;
};

const TreeCard: React.FC<TreeCardProps> = ({ nft }) => {
  const { contractAddress, tokenID, tokenMetadata } = nft;
  const blockExplorerUrl = `https://basescan.org/token/${contractAddress}?a=${tokenID}`;

  const handleCastTree = useCallback(async () => {
    try {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_URL || "https://miniapp.paeachtycoon.com";
      const campaignUrl = `${baseUrl}/tree/${nft.tokenID}`;

      let text = "I'm farming peaches!";

      if (tokenMetadata?.description) {
        text += ` Meet ${tokenMetadata.description}`;
      }

      if (tokenMetadata?.attributes[1]?.value !== "None") {
        if (tokenMetadata?.attributes[2]?.value === "Racoon") {
          text += ` and his Raccoon fren.`;
        } else {
          text += ` and his ${tokenMetadata?.attributes[1]?.value} fren.`;
        }
      }

      text +=
        " It will produce at least two peach boxes that each include a farmer's dozen (13) delicious, Palisade peaches!";

      await sdk.actions.composeCast({
        text,
        embeds: [campaignUrl],
      });
    } catch (error) {
      console.error("Error composing cast:", error);
    }
  }, [nft, tokenMetadata]);

  return (
    <div className="flex flex-col items-center bg-brand-gray p-4 rounded-lg">
      <div className="flex flex-row w-full justify-start mb-2">
        <Link
          href={`/tree/${tokenID}`}
          className="text-brand-orange underline text-xs"
        >
          {tokenMetadata?.name}
        </Link>
      </div>
      <div className="flex flex-row w-full gap-4">
        {tokenMetadata?.image ? (
          <img
            src={dhImagePath(tokenMetadata.image)}
            alt={tokenMetadata.name || `Tree ${tokenID}`}
            className="w-5/6 h-auto rounded-lg mb-2"
          />
        ) : (
          <div className="w-5/6 flex flex-col items-center">
            <img
              src="/images/tree_fallback.png"
              alt="Tree Reveal Coming Soon"
              className="w-full h-auto rounded-lg mb-2"
            />
            {tokenMetadata?.status === "REFRESHING" && (
              <p className="text-brand-orange text-sm text-center">
                Tree art will be revealed soon!
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-headline text-white">0</h1>
          <div className="flex flex-col items-center">
            <img src="/images/icon_water.png" alt="Water" className="w-8 h-8" />
            <CheckCircleIcon className="w-4 h-4 text-black" />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images/icon_fert.png"
              alt="Fertilizer"
              className="w-8 h-8"
            />
            <CheckCircleIcon className="w-4 h-4 text-black" />
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/icon_prune.png" alt="Prune" className="w-8 h-8" />
            <CheckCircleIcon className="w-4 h-4 text-black" />
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/icon_spray.png" alt="Spray" className="w-8 h-8" />
            <span className="text-xs text-white">0/2</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-1">
        {tokenMetadata?.description}
      </h2>
      <div className="flex flex-row items-center justify-center gap-2 py-4 mb-1 w-full justify-start pl-1">
        <span className="text-brand-green text-base">Current yield:</span>
        <span className="text-brand-green font-bold text-lg">2 X</span>
        <img
          src="/images/peach-avatar-trans.png"
          alt="Peach"
          className="h-6 w-auto"
        />
      </div>

      <button
        onClick={handleCastTree}
        className="flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-2 rounded-full mb-4 hover:bg-brand-orange/90 transition-colors"
      >
        Share Me
      </button>

      <p className="text-sm text-brand-blue mb-2 text-center">
        Care for your trees to boost peach yield.{" "}
        <span className="font-bold">Boost season is coming soon!</span>
      </p>
      <div className="grid grid-cols-2 gap-2 w-full opacity-25">
        <button
          disabled
          className="flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-blue px-4 py-2 rounded-full border border-brand-blue text-lg"
        >
          <img src="/images/icon_water.png" alt="Water" className="w-6 h-6" />
          Water
        </button>
        <button
          disabled
          className="flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-orange px-4 py-2 rounded-full border border-brand-orange text-lg"
        >
          <img
            src="/images/icon_fert.png"
            alt="Fertilize"
            className="w-6 h-6"
          />
          Fertilize
        </button>
        <button
          disabled
          className="flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-green px-4 py-2 rounded-full border border-brand-green text-lg"
        >
          <img src="/images/icon_prune.png" alt="Prune" className="w-6 h-6" />
          Prune
        </button>
        <button
          disabled
          className="flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-green px-4 py-2 rounded-full border border-brand-green text-lg"
        >
          <img src="/images/icon_spray.png" alt="Spray" className="w-6 h-6" />
          Spray
        </button>
      </div>
    </div>
  );
};

export default TreeCard;

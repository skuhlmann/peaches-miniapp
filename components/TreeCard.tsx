/* eslint-disable @next/next/no-img-element */
import { truncateAddress } from "@/lib/helpers";
import React, { useCallback } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import sdk from "@farcaster/frame-sdk";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTreePoints } from "@/hooks/use-tree-points";
import TreeBoosts from "./TreeBoosts";

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
  const { tokenID, tokenMetadata } = nft;
  const params = useParams();

  const { totalPoints, fert, prune, sprays, peachBoxes } = useTreePoints({
    tokenId: tokenID,
  });

  const handleCastTree = useCallback(async () => {
    try {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_URL || "https://miniapp.paeachtycoon.com";
      const campaignUrl = `${baseUrl}/tree/${nft.tokenID}/yield/${peachBoxes}`;

      console.log("campaignUrl", campaignUrl);

      let text = "I'm farming peaches!";

      if (tokenMetadata?.description) {
        text += ` Meet ${tokenMetadata.description}`;
      }

      if (tokenMetadata?.attributes[1]?.value !== "None") {
        if (tokenMetadata?.attributes[1]?.value === "Racoon") {
          text += ` and his Raccoon fren.`;
        } else {
          text += ` and his ${tokenMetadata?.attributes[1]?.value} fren.`;
        }
      }

      text += ` ${
        tokenMetadata?.description || "It"
      } will produce at least two peach boxes that each include a farmer's dozen (13) delicious, Palisade peaches!`;

      await sdk.actions.composeCast({
        text,
        embeds: [campaignUrl],
      });
    } catch (error) {
      console.error("Error composing cast:", error);
    }
  }, [nft, tokenMetadata, peachBoxes]);

  return (
    <div className="flex flex-col items-center bg-brand-gray p-4 rounded-lg">
      <div className="flex flex-row w-full justify-between mb-2">
        {params.tokenId ? (
          <p className="text-brand-white text-xs">{tokenMetadata?.name}</p>
        ) : (
          <Link
            href={`/tree/${tokenID}`}
            className="text-brand-orange underline text-xs"
          >
            {tokenMetadata?.name}
          </Link>
        )}
        <h1 className="text-4xl font-headline text-white mr-4">
          {totalPoints}
        </h1>
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
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center mt-2">
            <img
              src="/images/icon_fert.png"
              alt="Fertilizer"
              className="w-8 h-8"
            />
            <CheckCircleIcon
              className="w-4 h-4"
              fill={fert ? `#E46C1E` : `#959695`}
            />
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/icon_prune.png" alt="Prune" className="w-8 h-8" />
            <CheckCircleIcon
              className="w-4 h-4"
              fill={prune ? `#419361` : `#959695`}
            />
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/icon_spray.png" alt="Spray" className="w-8 h-8" />
            <span className="text-xs text-white">{sprays}/2</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-1">
        {tokenMetadata?.description}
      </h2>
      <div className="flex flex-row items-center justify-center gap-2 py-2 mb-1 w-full justify-start pl-1">
        <span className="text-brand-green text-base">Current yield:</span>
        <span className="text-brand-green font-bold text-lg">
          {peachBoxes} X
        </span>
        <img
          src="/images/peach-avatar-trans.png"
          alt="Peach"
          className="h-6 w-auto"
        />
      </div>

      <TreeBoosts tokenId={tokenID} />

      <button
        onClick={handleCastTree}
        className="flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-2 rounded-full mt-10 mb-4 hover:bg-brand-orange/90 transition-colors"
      >
        Cast Me
      </button>
    </div>
  );
};

export default TreeCard;

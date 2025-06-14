/* eslint-disable @next/next/no-img-element */
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePrices } from "@/hooks/use-prices";
import { formatEther, formatUnits } from "viem";
import ApprovalCheck from "./ApprovalCheck";
import { useAccount } from "wagmi";
import {
  FERT_CONTRACT_ADDRESS,
  PRUNE_CONTRACT_ADDRESS,
  SPRAY_CONTRACT_ADDRESS,
  TREE_ERC20_PAYMENT_TOKEN,
} from "@/lib/constants";
import { useTreePoints } from "@/hooks/use-tree-points";
import BalanceCheck from "./BalanceCheck";

type BoostContent = {
  title: string;
  description: string;
  points: number;
  ethCost: bigint;
  usdcCost: bigint;
  color: string;
  disclaimer?: string;
  contractAddress: `0x${string}`;
};

interface BoostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "fertilize" | "prune" | "spray";
  onStartTransaction: (isEth: boolean) => void;
  isDisabled: boolean;
  tokenId: string;
}

const BoostDrawer: React.FC<BoostDrawerProps> = ({
  isOpen,
  onClose,
  type,
  onStartTransaction,
  isDisabled,
  tokenId,
}) => {
  const {
    fertPrice,
    fertPriceErc20,
    prunePrice,
    prunePriceErc20,
    sprayPrice,
    sprayPriceErc20,
  } = usePrices();
  const { address } = useAccount();
  const { sprays, sprayWins } = useTreePoints({ tokenId });

  if (!isOpen || !address) return null;

  const getContent = (): BoostContent => {
    switch (type) {
      case "fertilize":
        return {
          title: "Fertilize",
          description:
            "Peach trees require essential nutrients to grow and thrive. Well-fertilized peach trees are generally healthier, more vigorous, and better able to resist pests, diseases, and environmental stresses. Healthy trees are more resilient and productive, producing higher-quality fruit over the long term. Properly balanced fertilization can stimulate vigorous growth, leading to increased fruit production.",
          points: 75,
          ethCost: fertPrice,
          usdcCost: fertPriceErc20,
          color: "brand-orange",
          contractAddress: FERT_CONTRACT_ADDRESS,
        };
      case "prune":
        return {
          title: "Prune",
          description:
            "Pruning is a critical practice for maintaining the health and productivity of your trees. You can only prune once before your trees go into spring blossom, so don't delay!",
          points: 75,
          ethCost: prunePrice,
          usdcCost: prunePriceErc20,
          color: "brand-green",
          contractAddress: PRUNE_CONTRACT_ADDRESS,
        };
      case "spray":
        return {
          title: "Spray",
          description:
            "Pests such as insects, mites, and diseases can significantly reduce fruit yield and quality in peach trees. They may feed on fruit, foliage, or other parts of the tree, causing damage that affects the tree's ability to produce healthy, marketable fruit. Effective pest control is essential for maximizing fruit yield and quality and protecting tree health.",
          disclaimer:
            "Spraying is a chance roll. You can purchase 2 sprays and will have have a chance at winning 2 discounted peach boxes",
          ethCost: sprayPrice,
          usdcCost: sprayPriceErc20,
          points: 33,
          color: "brand-blue",
          contractAddress: SPRAY_CONTRACT_ADDRESS,
        };
    }
  };

  const renderErc20Button = (content: BoostContent) => {
    const button = (
      <BalanceCheck
        address={address}
        price={content.usdcCost}
        tokenAddress={TREE_ERC20_PAYMENT_TOKEN}
        message={`Need ${formatUnits(content.usdcCost, 6)} to ${
          content.title
        } with USDC`}
      >
        <button
          className={`w-full py-3 rounded-full text-brand-black font-headline text-lg mt-auto bg-${
            content.color
          } ${isDisabled && "bg-opacity-50"}`}
          disabled={isDisabled}
          onClick={() => onStartTransaction(false)}
        >
          {content.title} for {formatUnits(content.usdcCost, 6)} USDC
        </button>
      </BalanceCheck>
    );

    return (
      <ApprovalCheck
        address={address}
        amount={content.usdcCost}
        spender={content.contractAddress}
        tokenAddress={TREE_ERC20_PAYMENT_TOKEN}
        buttonText={`Approve ${formatUnits(content.usdcCost, 6)} USDC to ${
          content.title
        }`}
        buttonColor={content.color}
        isDisabled={isDisabled}
      >
        {button}
      </ApprovalCheck>
    );
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-brand-gray w-full p-6 rounded-t-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold text-${content.color}`}>
            {content?.title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-brand-orange"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-white mb-4 text-sm">{content?.description}</p>
          <div className="bg-brand-gray/50 p-4 rounded-lg mb-6">
            {content.disclaimer && (
              <p className="text-brand-orange text-center font-bold mb-2 text-sm">
                {content?.disclaimer}
              </p>
            )}

            {type === "spray" ? (
              <div className="w-full text-center mb-4 font-bold text-brand-orange">
                {sprays === 2 && (
                  <div>
                    {`You've sprayed 2 times and won ${Number(
                      sprayWins
                    )} peach box${Number(sprayWins) === 1 ? "" : "es"}`}
                    . You are out of sprays.
                  </div>
                )}

                {sprays === 1 && (
                  <div>
                    {`You've sprayed 1 time and won ${Number(
                      sprayWins
                    )} peach box${
                      Number(sprayWins) === 1 ? "" : "es"
                    }. You can spray once more.`}
                  </div>
                )}

                {sprays === 0 && <div>You have 2 spray attempts left.</div>}
              </div>
            ) : (
              <div>You got a box of peaches and big points!</div>
            )}
            <p className="text-brand-green text-xs font-bold w-full text-center">
              You Get
            </p>
            <div className="flex flex-row items-center justify-center gap-2 mb-1 w-full justify-start pl-1">
              <span className="text-brand-green font-bold text-lg">1 X</span>
              <img
                src="/images/peach-avatar-trans.png"
                alt="Peach"
                className="h-6 w-auto"
              />
              <span className="text-brand-green font-bold text-lg">
                & {content?.points} Points
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <BalanceCheck
            address={address}
            price={content.ethCost}
            tokenAddress="native"
            message={`Need ${formatEther(content.ethCost)} to ${
              content.title
            } with ETH`}
          >
            <button
              className={`w-full py-3 rounded-full text-brand-black font-headline text-lg mt-auto bg-${
                content.color
              } ${isDisabled && "bg-opacity-50"}`}
              onClick={() => onStartTransaction(true)}
              disabled={isDisabled}
            >
              {content.title} for {formatEther(content.ethCost)} ETH
            </button>
          </BalanceCheck>
          <p className="text-white text-xs w-full text-center">or</p>
          {renderErc20Button(content)}
        </div>
      </div>
    </div>
  );
};

export default BoostDrawer;

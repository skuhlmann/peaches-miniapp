import { useState } from "react";
import TransactionDrawer from "./TransactionDrawer";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import TreeERC721 from "../lib/abis/TreeERC721.json";
import {
  CRITTER_COUNT_PLUS_ONE,
  TREE_NFT_CONTRACT_ADDRESS,
  NFT_MINT_PRICE,
  TREE_NFT_MINT_PRICE_ERC20,
  TREE_NFT_MINT_DISCOUNT_PERC,
} from "@/lib/constants";

const DISCOUNT_PERCENTAGE = 0.2; // 20% discount

const getCritterId = () => {
  return Math.floor(Math.random() * CRITTER_COUNT_PLUS_ONE);
};

const formatPrice = (price: bigint, isEth: boolean) => {
  if (isEth) {
    const ethValue = Number(price) / 1e18;
    return `${ethValue.toFixed(3)} ETH`;
  } else {
    const usdcValue = Number(price) / 1e6;
    return `${usdcValue.toFixed(0)} USDC`;
  }
};

export default function MintTreeCard({
  tree,
  hasDiscount,
}: {
  tree: { name: string; img: string; value: number };
  hasDiscount: boolean;
}) {
  const [currency, setCurrency] = useState<"ETH" | "USDC">("ETH");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const calculateDiscountedPrice = (price: bigint, isEth: boolean) => {
    const discountedValue = hasDiscount
      ? price - (price * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) / BigInt(100)
      : price;
    return formatPrice(discountedValue, isEth);
  };

  const originalPrice = formatPrice(
    currency === "ETH" ? NFT_MINT_PRICE : TREE_NFT_MINT_PRICE_ERC20,
    currency === "ETH"
  );
  const discountedPrice = calculateDiscountedPrice(
    currency === "ETH" ? NFT_MINT_PRICE : TREE_NFT_MINT_PRICE_ERC20,
    currency === "ETH"
  );

  const handleMint = () => {
    if (currency === "ETH") {
      const price = hasDiscount
        ? NFT_MINT_PRICE -
          (NFT_MINT_PRICE * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) / BigInt(100)
        : NFT_MINT_PRICE;

      writeContract({
        address: TREE_NFT_CONTRACT_ADDRESS,
        abi: TreeERC721,
        functionName: "mint",
        value: price,
        args: [tree.value, getCritterId()],
      });
    } else {
      const amount = hasDiscount
        ? TREE_NFT_MINT_PRICE_ERC20 -
          (TREE_NFT_MINT_PRICE_ERC20 * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) /
            BigInt(100)
        : TREE_NFT_MINT_PRICE_ERC20;

      writeContract({
        address: TREE_NFT_CONTRACT_ADDRESS,
        abi: TreeERC721,
        functionName: "mintERC20",
        args: [tree.value, getCritterId(), amount],
      });
    }
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-brand-green/20 rounded-2xl p-6 flex flex-col items-center shadow-lg max-w-md w-full">
        <img
          src={`/images/${tree.img}`}
          alt={tree.name}
          className="w-40 object-contain mb-4"
        />
        <div className="flex items-center justify-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`currency-${tree.value}`}
              value="ETH"
              checked={currency === "ETH"}
              onChange={() => setCurrency("ETH")}
              className="accent-brand-green"
            />
            <span className="text-sm">ETH</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`currency-${tree.value}`}
              value="USDC"
              checked={currency === "USDC"}
              onChange={() => setCurrency("USDC")}
              className="accent-brand-orange"
            />
            <span className="text-sm">USDC</span>
          </label>
        </div>
        <div className="mb-2 text-center">
          {hasDiscount && (
            <div className="text-brand-red font-bold text-sm">
              You Got the Season 2 Farmer Discount!
            </div>
          )}
          <div className="flex flex-col items-center">
            {hasDiscount && (
              <span className="text-xl line-through text-gray-500">
                {originalPrice}
              </span>
            )}
            <span className="text-xl text-brand-blue font-bold">
              {hasDiscount ? discountedPrice : originalPrice}
            </span>
          </div>
        </div>
        <button
          className="w-full py-3 rounded-full text-brand-black font-headline bg-brand-green hover:text-brand-orange transition-colors text-lg mt-auto"
          onClick={handleMint}
          disabled={isPending}
        >
          {isPending ? "Minting..." : "MINT"}
        </button>
      </div>

      <TransactionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Minting"
        hash={hash}
        isPending={isPending}
        error={error || undefined}
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-between">
            <span className="font-medium">{tree.name}</span>
            <img
              src={`/images/${tree.img}`}
              alt={tree.name}
              className="w-40 object-contain mb-4"
            />
          </div>
        </div>
      </TransactionDrawer>
    </>
  );
}

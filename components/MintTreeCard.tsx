/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import TransactionDrawer from "./TransactionDrawer";
import { useWriteContract, useAccount } from "wagmi";
import TreeERC721 from "../lib/abis/TreeERC721.json";
import BalanceCheck from "./BalanceCheck";
import ApprovalCheck from "./ApprovalCheck";
import { useAccountTrees } from "@/hooks/use-account-trees";
import {
  CRITTER_COUNT_PLUS_ONE,
  TREE_NFT_CONTRACT_ADDRESS,
  TREE_NFT_MINT_DISCOUNT_PERC,
  TARGET_CHAIN_ID,
  TREE_ERC20_PAYMENT_TOKEN,
} from "@/lib/constants";
import { useTreeMintPrice } from "@/hooks/use-tree-mint-price";

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

  const { isConnected, chainId, address } = useAccount();
  const { refetch: refetchAccountTrees } = useAccountTrees({
    accountAddress: address || "",
  });
  const { erc20MintPrice, nativeMintPrice } = useTreeMintPrice();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const calculateDiscountedPrice = (price: bigint, isEth: boolean) => {
    const discountedValue = hasDiscount
      ? price - (price * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) / BigInt(100)
      : price;
    return formatPrice(discountedValue, isEth);
  };

  const originalPrice = formatPrice(
    currency === "ETH" ? nativeMintPrice : erc20MintPrice,
    currency === "ETH"
  );
  const discountedPrice = calculateDiscountedPrice(
    currency === "ETH" ? nativeMintPrice : erc20MintPrice,
    currency === "ETH"
  );

  const handleMint = () => {
    if (currency === "ETH") {
      const price = hasDiscount
        ? nativeMintPrice -
          (nativeMintPrice * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) / BigInt(100)
        : nativeMintPrice;

      writeContract({
        address: TREE_NFT_CONTRACT_ADDRESS,
        abi: TreeERC721,
        functionName: "mint",
        value: price,
        args: [tree.value, getCritterId()],
      });
    } else {
      const amount = hasDiscount
        ? erc20MintPrice -
          (erc20MintPrice * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) / BigInt(100)
        : erc20MintPrice;

      writeContract({
        address: TREE_NFT_CONTRACT_ADDRESS,
        abi: TreeERC721,
        functionName: "mintERC20",
        args: [tree.value, getCritterId(), amount],
      });
    }
    setIsDrawerOpen(true);
  };

  const invalidConnection = !isConnected || TARGET_CHAIN_ID !== chainId;
  const isDisabled = isPending || invalidConnection;

  const getPrice = () => {
    const basePrice = currency === "ETH" ? nativeMintPrice : erc20MintPrice;
    return hasDiscount
      ? basePrice -
          (basePrice * BigInt(TREE_NFT_MINT_DISCOUNT_PERC)) / BigInt(100)
      : basePrice;
  };

  const renderButton = () => {
    const button = (
      <button
        className={`w-full py-3 rounded-full text-brand-black font-headline text-lg mt-auto ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-brand-green hover:text-brand-orange transition-colors"
        }`}
        onClick={handleMint}
        disabled={isDisabled}
      >
        {invalidConnection ? (
          "Connect Wallet to Base"
        ) : (
          <>{isPending ? "Minting..." : "MINT"}</>
        )}
      </button>
    );

    if (currency === "USDC" && address) {
      return (
        <ApprovalCheck
          address={address}
          amount={getPrice()}
          spender={TREE_NFT_CONTRACT_ADDRESS}
          tokenAddress={TREE_ERC20_PAYMENT_TOKEN}
        >
          {button}
        </ApprovalCheck>
      );
    }

    return button;
  };

  return (
    <>
      <div className="bg-brand-gray rounded-2xl p-6 flex flex-col items-center shadow-lg max-w-md w-full">
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
        {address && (
          <BalanceCheck
            address={address}
            price={getPrice()}
            tokenAddress={
              currency === "ETH" ? "native" : TREE_ERC20_PAYMENT_TOKEN
            }
          >
            {renderButton()}
          </BalanceCheck>
        )}
      </div>

      <TransactionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Minting"
        hash={hash}
        isPending={isPending}
        error={error || undefined}
        successElement={
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              // Dispatch a custom event to switch to the trees tab
              window.dispatchEvent(new CustomEvent("switchToTreesTab"));
              refetchAccountTrees();
            }}
            className="flex items-center gap-2 text-brand-orange hover:text-brand-orange/80 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>View in My Trees</span>
          </button>
        }
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

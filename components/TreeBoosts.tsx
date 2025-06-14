/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import BoostDrawer from "./BoostDrawer";
import TransactionDrawer from "./TransactionDrawer";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";
import FertABI from "@/lib/abis/Fert.json";
import PruneABI from "@/lib/abis/Prune.json";
import SprayABI from "@/lib/abis/Spray.json";
import {
  FERT_CONTRACT_ADDRESS,
  PRUNE_CONTRACT_ADDRESS,
  SPRAY_CONTRACT_ADDRESS,
  TARGET_CHAIN_ID,
  TREE_ERC20_PAYMENT_TOKEN,
} from "@/lib/constants";
import { usePrices } from "@/hooks/use-prices";
import { useTreePoints } from "@/hooks/use-tree-points";

interface TreeBoostsProps {
  tokenId: string;
}

const TreeBoosts: React.FC<TreeBoostsProps> = ({ tokenId }) => {
  const [activeDrawer, setActiveDrawer] = useState<
    "fertilize" | "prune" | "spray" | null
  >(null);
  const [activeSprayTx, setActiveSprayTx] = useState<boolean>(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isConnected, chainId } = useAccount();
  const {
    refetch: refetchTreePoints,
    sprays,
    sprayWins,
    fert,
    prune,
  } = useTreePoints({ tokenId });
  const {
    fertPrice,
    fertPriceErc20,
    prunePrice,
    prunePriceErc20,
    sprayPrice,
    sprayPriceErc20,
  } = usePrices();
  const { switchChain } = useSwitchChain();

  const invalidConnection = !isConnected || TARGET_CHAIN_ID !== chainId;
  const isDisabled = isPending || invalidConnection;

  useEffect(() => {
    if (isConnected && invalidConnection) {
      console.log("switchChain", TARGET_CHAIN_ID);
      switchChain({ chainId: TARGET_CHAIN_ID });
    }
  }, [invalidConnection, isConnected, switchChain]);

  const handleOpenDrawer = (type: "fertilize" | "prune" | "spray") => {
    setActiveDrawer(type);
  };

  const handleCloseDrawer = () => {
    setActiveDrawer(null);
  };

  const getContractInfo = (isEth: boolean) => {
    switch (activeDrawer) {
      case "fertilize":
        return {
          address: FERT_CONTRACT_ADDRESS as `0x${string}`,
          abi: FertABI,
          price: isEth ? fertPrice : fertPriceErc20,
          functionName: isEth ? "fertilize" : "fertilizeERC20",
        };
      case "prune":
        return {
          address: PRUNE_CONTRACT_ADDRESS as `0x${string}`,
          abi: PruneABI,
          price: isEth ? prunePrice : prunePriceErc20,
          functionName: isEth ? "prune" : "pruneERC20",
        };
      case "spray":
        return {
          address: SPRAY_CONTRACT_ADDRESS as `0x${string}`,
          abi: SprayABI,
          price: isEth ? sprayPrice : sprayPriceErc20,
          functionName: isEth ? "spray" : "sprayERC20",
        };
      default:
        throw new Error("Invalid boost type");
    }
  };

  const handleStartTransaction = (isEth: boolean) => {
    setActiveSprayTx(activeDrawer === "spray");
    handleCloseDrawer();
    setIsTransactionOpen(true);

    const contractInfo = getContractInfo(isEth);

    if (isEth) {
      writeContract({
        address: contractInfo.address as `0x${string}`,
        abi: contractInfo.abi,
        functionName: contractInfo.functionName,
        value: contractInfo.price,
        args: [tokenId],
      });
    } else {
      writeContract({
        address: contractInfo.address as `0x${string}`,
        abi: contractInfo.abi,
        functionName: contractInfo.functionName,
        args: [tokenId, contractInfo.price],
      });
    }
  };

  const handleTransactionSuccess = () => {
    refetchTreePoints();
  };

  return (
    <>
      <p className="text-sm text-brand-blue mb-2 text-center">
        Care for your trees to boost peach yield. Maxing out boosts will result
        in 1 (one) additional Peach Box!
      </p>
      <div className="grid grid-cols-1 gap-2 w-full font-headline">
        <button
          onClick={() => handleOpenDrawer("fertilize")}
          disabled={fert}
          className={`flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-orange px-4 py-2 rounded-full border border-brand-orange text-lg ${
            fert && "opacity-70 hover:cursor-unset"
          }`}
        >
          <img
            src="/images/icon_fert.png"
            alt="Fertilize"
            className="w-6 h-6"
          />
          Fertilize
          {fert && <CheckCircleIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={() => handleOpenDrawer("prune")}
          className={`flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-green px-4 py-2 rounded-full border border-brand-green text-lg ${
            prune && "opacity-70  hover:cursor-unset"
          }`}
        >
          <img src="/images/icon_prune.png" alt="Prune" className="w-6 h-6" />
          Prune
          {prune && <CheckCircleIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={() => handleOpenDrawer("spray")}
          className={`flex items-center justify-center gap-2 bg-brand-gray/50 text-brand-blue px-4 py-2 rounded-full border border-brand-blue text-lg ${
            sprays === 2 && "opacity-70  hover:cursor-unset"
          }`}
        >
          <img src="/images/icon_spray.png" alt="Spray" className="w-6 h-6" />
          Spray
          {sprays == 2 && <CheckCircleIcon className="w-6 h-6" />}
          {sprays == 0 && <span className="text-sm font-sans">(0/2)</span>}
          {sprays == 1 && <span className="text-sm font-sans">(1/2)</span>}
        </button>
      </div>

      <BoostDrawer
        isOpen={activeDrawer !== null}
        onClose={handleCloseDrawer}
        type={activeDrawer || "fertilize"}
        onStartTransaction={handleStartTransaction}
        isDisabled={isDisabled}
        tokenId={tokenId}
      />

      <TransactionDrawer
        isOpen={isTransactionOpen}
        onClose={() => setIsTransactionOpen(false)}
        title={`${
          activeDrawer
            ? activeDrawer.charAt(0).toUpperCase() + activeDrawer.slice(1)
            : ""
        } Transaction`}
        hash={hash}
        isPending={isPending}
        error={error || undefined}
        onSuccess={handleTransactionSuccess}
        successElement={
          <>
            {activeSprayTx ? (
              <>
                <div>You got points!</div>
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
              </>
            ) : (
              <div>You got a box of peaches and big points!</div>
            )}
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-between">
            <span className="font-medium">{activeDrawer}</span>
            {error && (
              <p className="text-brand-red text-sm mt-2">{error.message}</p>
            )}
          </div>
        </div>
      </TransactionDrawer>
    </>
  );
};

export default TreeBoosts;

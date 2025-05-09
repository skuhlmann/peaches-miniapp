import { useReadContract, useWriteContract } from "wagmi";
import { erc20Abi } from "viem";
import TransactionDrawer from "./TransactionDrawer";
import { useState } from "react";

interface ApprovalCheckProps {
  address: `0x${string}`;
  amount: bigint;
  spender: `0x${string}`;
  tokenAddress: `0x${string}`;
  children: React.ReactNode;
}

export default function ApprovalCheck({
  address,
  amount,
  spender,
  tokenAddress,
  children,
}: ApprovalCheckProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: allowance,
    refetch,
    isLoading,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, spender],
  });

  const {
    data: hash,
    error,
    isPending,
    writeContract: approve,
  } = useWriteContract();

  const handleApprove = () => {
    approve({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, amount],
    });
    setIsDrawerOpen(true);
  };

  if (isLoading) {
    return <div className="text-sm text-gray-500">Checking approval...</div>;
  }

  if (!allowance || allowance < amount) {
    return (
      <>
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="w-full py-3 rounded-full text-brand-black font-headline text-lg mt-auto bg-brand-orange hover:text-brand-green transition-colors"
        >
          {isPending ? "Approving..." : "Approve USDC"}
        </button>

        <TransactionDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            if (!isPending && !error) {
              refetch();
            }
          }}
          title="Approving USDC"
          hash={hash}
          isPending={isPending}
          error={error || undefined}
        >
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-between">
              <span className="font-medium">USDC Approval</span>
              <p className="text-sm text-gray-500 mt-2">
                This allows the contract to spend your USDC tokens for minting.
              </p>
            </div>
          </div>
        </TransactionDrawer>
      </>
    );
  }

  return <>{children}</>;
}

import { useBalance, useReadContract } from "wagmi";
import { erc20Abi } from "viem";

interface BalanceCheckProps {
  address: `0x${string}`;
  price: bigint;
  tokenAddress: `0x${string}` | "native";
  message?: string;
  children: React.ReactNode;
}

export default function BalanceCheck({
  address,
  price,
  tokenAddress,
  message,
  children,
}: BalanceCheckProps) {
  const { data: nativeBalance, isLoading: isNativeLoading } = useBalance({
    address,
  });

  const { data: tokenBalance, isLoading: isTokenLoading } = useReadContract({
    address: tokenAddress === "native" ? undefined : tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }) as { data: bigint; isLoading: boolean };

  const isLoading =
    tokenAddress === "native" ? isNativeLoading : isTokenLoading;
  const balance =
    tokenAddress === "native" ? nativeBalance?.value : tokenBalance;

  if (isLoading) {
    return <div className="text-sm text-gray-500">Checking balance...</div>;
  }

  if (!balance || balance < price) {
    return (
      <div className="text-sm text-brand-red font-medium w-full text-center">
        {message || "Insufficient funds"}
      </div>
    );
  }

  return <>{children}</>;
}

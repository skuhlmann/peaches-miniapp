import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import treeAbi from "../lib/abis/TreeERC721.json";
import { TREE_NFT_CONTRACT_ADDRESS_2024 } from "@/lib/constants";

export default function HasDiscount() {
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    abi: treeAbi,
    functionName: "balanceOf",
    address: TREE_NFT_CONTRACT_ADDRESS_2024,
    args: [address || "0x0000000000000000000000000000000000000000"],
  });

  const hasDiscount = balance ? Number(balance) > 0 : false;

  return (
    <div className="text-center py-4">
      {hasDiscount ? (
        <p className="text-lg font-headline text-brand-orange">
          You have a discount!
        </p>
      ) : (
        <p className="text-lg font-headline">No discount available</p>
      )}
    </div>
  );
}

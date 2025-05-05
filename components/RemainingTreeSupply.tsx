import { useReadContract } from "wagmi";
import treeAbi from "../lib/abis/TreeERC721.json";
import { TREE_NFT_CONTRACT_ADDRESS } from "@/lib/constants";

const supply = 150;

export default function RemainingTreeSupply() {
  const { data: totalSupply } = useReadContract({
    abi: treeAbi,
    functionName: "totalSupply",
    address: TREE_NFT_CONTRACT_ADDRESS,
  });

  const remainingSupply = totalSupply ? supply - Number(totalSupply) : 0;

  if (!remainingSupply) {
    return (
      <div className="text-center py-2">
        <p className="text-lg font-headline">{supply} Trees Available</p>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <p className="text-lg font-headline">
        Only {remainingSupply} Trees Left!
      </p>
    </div>
  );
}

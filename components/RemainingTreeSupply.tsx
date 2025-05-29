import { useReadContract } from "wagmi";
import treeAbi from "../lib/abis/TreeERC721.json";
import { TREE_NFT_CONTRACT_ADDRESS } from "@/lib/constants";

const supply = 100;

export default function RemainingTreeSupply() {
  const { data: totalSupply } = useReadContract({
    abi: treeAbi,
    functionName: "totalSupply",
    address: TREE_NFT_CONTRACT_ADDRESS,
  });

  const remainingSupply = totalSupply ? supply - Number(totalSupply) : 0;

  if (!remainingSupply) {
    return;
  }

  return (
    <div className="text-center">
      <p className="text-xl font-headline">
        Only {remainingSupply} Trees Left!
      </p>
    </div>
  );
}

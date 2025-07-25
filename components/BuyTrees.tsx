// import RemainingTreeSupply from "./RemainingTreeSupply";
// import { TREE_NFT_CONTRACT_ADDRESS_2024, TREE_NFT_DATA } from "@/lib/constants";
// import MintTreeCard from "./MintTreeCard";
import { useAccount } from "wagmi";
// import treeAbi from "../lib/abis/TreeERC721.json";
// import { useState } from "react";

export default function BuyTrees() {
  const { address } = useAccount();
  // const [selectedTrunk, setSelectedTrunk] = useState(0);

  // const { data: balance } = useReadContract({
  //   abi: treeAbi,
  //   functionName: "balanceOf",
  //   address: TREE_NFT_CONTRACT_ADDRESS_2024,
  //   args: [address || "0x0000000000000000000000000000000000000000"],
  // });

  // const hasDiscount = balance ? Number(balance) > 0 : false;

  return (
    <div className="container">
      {/* <RemainingTreeSupply /> */}
      <div className="text-center">
        <p className="text-xl font-headline">
          Tree Sales Have Closed for the 2025 Season
        </p>
        <p className="text-xl font-body mt-3">
          The Peach Market will open soon where you can buy individual peach
          boxes directly from farmers.
        </p>

        <div className="mt-12">
          <a
            href="https://peachtycoon.com/#/market"
            target="_blank"
            className="my-6 px-12 py-6 text-2xl font-headline text-brand-red bg-brand-black border-2 border-brand-orange rounded-full hover:bg-orange-500/10 transition-colors duration-200"
          >
            PEACH MARKET
          </a>
        </div>
      </div>
      {/* <p className="text-sm w-full text-center text-brand-blue mb-3">
        Pick a Trunk
      </p> */}
      {/* <div className="flex justify-center gap-4 mb-2">
        {TREE_NFT_DATA.map((tree, index) => (
          <label
            key={tree.value}
            className={`flex items-center gap-2 text-xs cursor-pointer border-brand-green text-brand-orange`}
          >
            <input
              type="radio"
              name="trunk-selector"
              value={index}
              checked={selectedTrunk === index}
              onChange={() => setSelectedTrunk(index)}
              className="accent-brand-green"
            />
            {tree.name}
          </label>
        ))}
      </div> */}
      {/* <div className="flex justify-center">
        <MintTreeCard
          tree={TREE_NFT_DATA[selectedTrunk]}
          hasDiscount={hasDiscount}
        />
      </div> */}
    </div>
  );
}

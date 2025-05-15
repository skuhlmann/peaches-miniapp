import { useReadContract } from "wagmi";
import TreeERC721ABI from "../lib/abis/TreeERC721.json";
import { TREE_NFT_CONTRACT_ADDRESS } from "@/lib/constants";

type TreeMintPrice = {
  erc20MintPrice: bigint;
  nativeMintPrice: bigint;
};

export const useTreeMintPrice = (): TreeMintPrice => {
  const contractAddress = TREE_NFT_CONTRACT_ADDRESS;

  const { data: erc20MintPrice } = useReadContract({
    address: contractAddress,
    abi: TreeERC721ABI,
    functionName: "erc20MintPrice",
  }) as { data: bigint | undefined };

  const { data: nativeMintPrice } = useReadContract({
    address: contractAddress,
    abi: TreeERC721ABI,
    functionName: "mintPrice",
  }) as { data: bigint | undefined };

  return {
    erc20MintPrice: erc20MintPrice || BigInt(0),
    nativeMintPrice: nativeMintPrice || BigInt(0),
  };
};

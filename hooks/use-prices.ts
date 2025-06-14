import { useReadContract } from "wagmi";
import { TARGET_NETWORK, TREE_NFT_CONTRACT_ADDRESS } from "../lib/constants";
import TreeERC721ABI from "../lib/abis/TreeERC721.json";

export const PRUNE_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(18000000000000000),
  "0x2105": BigInt(25000000000000000),
};

export const PRUNE_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(18000000000000000),
  "0x2105": BigInt(75000000),
};

export const FERT_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(25000000000000000),
  "0x2105": BigInt(25000000000000000),
};

export const FERT_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(25000000000000000),
  "0x2105": BigInt(75000000),
};

export const SPRAY_PRICE: Record<string, bigint> = {
  "0xaa36a7": BigInt(10000000000000000),
  "0x2105": BigInt(10000000000000000),
};

export const SPRAY_PRICE_ERC20: Record<string, bigint> = {
  "0xaa36a7": BigInt(10000000000000000),
  "0x2105": BigInt(30000000),
};

type TreeMintPrice = {
  erc20MintPrice: bigint | undefined;
  nativeMintPrice: bigint | undefined;
  prunePrice: bigint;
  prunePriceErc20: bigint;
  fertPrice: bigint;
  fertPriceErc20: bigint;
  sprayPrice: bigint;
  sprayPriceErc20: bigint;
};

export const usePrices = (): TreeMintPrice => {
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
    erc20MintPrice,
    nativeMintPrice,
    prunePrice: PRUNE_PRICE[TARGET_NETWORK],
    prunePriceErc20: PRUNE_PRICE_ERC20[TARGET_NETWORK],
    fertPrice: FERT_PRICE[TARGET_NETWORK],
    fertPriceErc20: FERT_PRICE_ERC20[TARGET_NETWORK],
    sprayPrice: SPRAY_PRICE[TARGET_NETWORK],
    sprayPriceErc20: SPRAY_PRICE_ERC20[TARGET_NETWORK],
  };
};

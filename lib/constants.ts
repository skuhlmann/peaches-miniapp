import { base } from "viem/chains";

export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 day

export const HAUS_RPC_DEFAULTS: Record<string, string> = {
  "0x1": `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0x64": `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xa": `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xa4b1": `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xaa36a7": `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0x2105": `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
};

// export const TARGET_CHAIN_ID = sepolia.id;
export const TARGET_CHAIN_ID = base.id;

export const TREE_NFT_CONTRACT_ADDRESS_2024 =
  "0xA9d3c833df8415233e1626F29E33ccBA37d2A187";
// base
// "0xA9d3c833df8415233e1626F29E33ccBA37d2A187";
//sepolia
// "0xB49a877D82c1f0133B0293dfd20eB54BEd07a290"

export const TREE_NFT_CONTRACT_ADDRESS =
  "0xc9A3102ef6dEb166D607a107892db10Bc50607ad";
// base
// 0xc9A3102ef6dEb166D607a107892db10Bc50607ad
// sepolia
// 0x77Bb60A289cA50b5A90729ED727c2dAf0db97Ca0

export const TREE_ERC20_PAYMENT_TOKEN =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export const NFT_MINT_PRICE = BigInt(88800000000000000);
// export const NFT_MINT_PRICE = BigInt(6900000000000000);

export const TREE_NFT_MINT_PRICE_ERC20 = BigInt(300000000);
export const TREE_NFT_MINT_DISCOUNT_PERC = 10;

export const SEQUENCE_ENDPOINT = "https://base-indexer.sequence.app";
// export const SEQUENCE_ENDPOINT = "https://sepolia-indexer.sequence.app";

export type NftTreeMeta = { name: string; img: string; value: number };

export const CRITTER_COUNT_PLUS_ONE = 9;

export const TREE_NFT_DATA: NftTreeMeta[] = [
  {
    name: "MF Bloom",
    img: "tree-1.png",
    value: 0,
  },
  {
    name: "Warren Tree",
    img: "tree-2.png",
    value: 1,
  },
  {
    name: "Notorious P.E.A.C.H.",
    img: "tree-3.png",
    value: 2,
  },
];

export const CRITTER_NAMES = [
  "None",
  "Bear",
  "Fox",
  "Raccoon",
  "Sack",
  "Squirrel",
  "Wine Barrel",
  "Eagle",
  "Crow",
];

export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 day

export const HAUS_RPC_DEFAULTS: Record<string, string> = {
  "0x1": `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0x64": `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xa": `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xa4b1": `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xaa36a7": "https://eth-sepolia.g.alchemy.com/v2/demo",
  "0x2105": `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
};

export const TREE_NFT_CONTRACT_ADDRESS_2024 =
  "0xA9d3c833df8415233e1626F29E33ccBA37d2A187";
// 0x4BF1dbF84A9be841F2209E23Da22514a28F124C0

export const TREE_NFT_CONTRACT_ADDRESS =
  "0xA9d3c833df8415233e1626F29E33ccBA37d2A187";
// 0x4BF1dbF84A9be841F2209E23Da22514a28F124C0

export const NFT_MINT_PRICE = BigInt(170000000000000000);
export const TREE_NFT_MINT_PRICE_ERC20 = BigInt(300000000);
export const TREE_NFT_MINT_DISCOUNT_PERC = 10;

export const SEQUENCE_ENDPOINT = "https://base-indexer.sequence.app";

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

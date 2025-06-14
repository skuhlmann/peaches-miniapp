import { base } from "viem/chains";

export const TARGET_NETWORK = "0x2105";
// export const TARGET_NETWORK = "0xaa36a7";
export const CHAIN_OBJ = base;
// export const CHAIN_OBJ = sepolia;
// export const TARGET_CHAIN_ID = sepolia.id;
export const TARGET_CHAIN_ID = base.id;

export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 day

export const HAUS_RPC_DEFAULTS: Record<string, string> = {
  "0x1": `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0x64": `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xa": `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xa4b1": `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0xaa36a7": `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  "0x2105": `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
};
export const SEQUENCE_ENDPOINT = "https://base-indexer.sequence.app";
// export const SEQUENCE_ENDPOINT = "https://sepolia-indexer.sequence.app";

export const TREE_NFT_CONTRACT_ADDRESS_2024 =
  "0xA9d3c833df8415233e1626F29E33ccBA37d2A187";
export const TREE_NFT_CONTRACT_ADDRESS =
  "0xc9A3102ef6dEb166D607a107892db10Bc50607ad";
// export const TREE_NFT_CONTRACT_ADDRESS =
// "0x77Bb60A289cA50b5A90729ED727c2dAf0db97Ca0";
export const TREE_ERC20_PAYMENT_TOKEN =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
// export const TREE_ERC20_PAYMENT_TOKEN =
// "0x53c8156592A64E949A4736c6D3309002fa0b2Aba";
export const NFT_MINT_PRICE = BigInt(88800000000000000);
export const TREE_NFT_MINT_PRICE_ERC20 = BigInt(300000000);
export const TREE_NFT_MINT_DISCOUNT_PERC = 10;

export const FERT_CONTRACT_ADDRESS =
  "0x40175A3488Cf5ac199Cb6D81DCAc8Fa7F0A993Da";
// export const FERT_CONTRACT_ADDRESS =
// "0x6Baa91AEd7707933462F3A658A72D69f01144134";

export const PRUNE_CONTRACT_ADDRESS =
  "0x3C444C4D587091697fb1424269C09bb7a099Ce70";
// export const PRUNE_CONTRACT_ADDRESS =
// "0x0E8bB0BA9413b39701Bf6F84A068511FdAd3d84D";

export const SPRAY_CONTRACT_ADDRESS =
  "0xEA2Bdda968047CaaE862eEcD71B63D15e79Ab5eB";
// export const SPRAY_CONTRACT_ADDRESS =
// "0x23c5188a524bd8C387fDCA22de9aA6451F227Ce1";

export const SPRAYS_PER_TOKEN = 2;

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

export const BOOST_POINTS = {
  PRUNE: 50,
  WATERING: 1,
  FERT: 75,
  SPRAY: 33,
};

export const BOOST_BONUS = {
  PRUNE: 1,
  FERT: 1,
  SPRAY: 1,
  MAX: 1,
};

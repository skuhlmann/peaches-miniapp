import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

import {
  HAUS_RPC_DEFAULTS,
  BOOST_BONUS,
  BOOST_POINTS,
  CHAIN_OBJ,
  FERT_CONTRACT_ADDRESS,
  PRUNE_CONTRACT_ADDRESS,
  SPRAYS_PER_TOKEN,
  SPRAY_CONTRACT_ADDRESS,
  TARGET_NETWORK,
} from "../lib/constants";
import prunAbi from "../lib/abis/Prune.json";
import fertAbi from "../lib/abis/Fert.json";
import sprayAbi from "../lib/abis/Spray.json";

const addPoints = ({
  prune,
  fert,
  sprays,
}: {
  prune: boolean;
  fert: boolean;
  sprays: number;
}): number => {
  let totalPoints = 0;
  if (prune) totalPoints += BOOST_POINTS.PRUNE;
  if (fert) totalPoints += BOOST_POINTS.FERT;
  const sprayPoints = sprays * BOOST_POINTS.SPRAY;

  totalPoints += sprayPoints;

  return totalPoints;
};

const addPeachBoxes = ({
  prune,
  fert,
  sprayWins,
  sprays,
}: {
  prune: boolean;
  fert: boolean;
  sprayWins: number;
  sprays: number;
}): number => {
  let peachBoxes = 2;
  if (prune) peachBoxes += BOOST_BONUS.PRUNE;
  if (fert) peachBoxes += BOOST_BONUS.FERT;
  const sprayBoxes = sprayWins * BOOST_BONUS.SPRAY;
  if (prune && fert && sprays === 2) peachBoxes += BOOST_BONUS.MAX;

  peachBoxes += sprayBoxes;

  return peachBoxes;
};

const fetchPointsForTree = async ({
  tokenId,
  pruneAddress,
  fertAddress,
  sprayAddress,
}: {
  tokenId: string;
  pruneAddress?: string;
  fertAddress?: string;
  sprayAddress?: string;
}) => {
  if (!tokenId || !pruneAddress || !fertAddress || !sprayAddress) {
    throw new Error("Missing Args");
  }

  const publicClient = createPublicClient({
    chain: CHAIN_OBJ,
    transport: http(HAUS_RPC_DEFAULTS[TARGET_NETWORK]),
  });

  const pruneData = await publicClient.readContract({
    address: pruneAddress as `0x${string}`,
    abi: prunAbi,
    functionName: "prunings",
    args: [tokenId],
  });

  const prune = pruneData == 1;

  const fertData = await publicClient.readContract({
    address: fertAddress as `0x${string}`,
    abi: fertAbi,
    functionName: "fertilizations",
    args: [tokenId],
  });

  const fert = fertData == 1;

  const sprays = (await publicClient.readContract({
    address: sprayAddress as `0x${string}`,
    abi: sprayAbi,
    functionName: "sprayAttempts",
    args: [tokenId],
  })) as number;

  const canSpray = sprays < SPRAYS_PER_TOKEN;

  const sprayWins = (await publicClient.readContract({
    address: sprayAddress as `0x${string}`,
    abi: sprayAbi,
    functionName: "sprayWins",
    args: [tokenId],
  })) as number;

  const totalPoints = addPoints({
    prune,
    fert,
    sprays,
  });

  const peachBoxes = addPeachBoxes({ prune, fert, sprayWins, sprays });

  return {
    totalPoints,
    prune,
    fert,
    sprays,
    sprayWins,
    canSpray,
    peachBoxes,
  };
};

export const useTreePoints = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`treePoints-${tokenId}`],
    queryFn: () =>
      fetchPointsForTree({
        tokenId,
        pruneAddress: PRUNE_CONTRACT_ADDRESS,
        fertAddress: FERT_CONTRACT_ADDRESS,
        sprayAddress: SPRAY_CONTRACT_ADDRESS,
      }),
  });

  return { error, ...data, ...rest };
};

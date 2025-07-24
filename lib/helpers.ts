export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

type PeachAttribute = { trait_type: string; value: string };
export const peachState = (attrs: { [key: string]: any }[]) => {
  const inCrate = attrs.find((a) => a.trait_type === "Opened");
  if (inCrate) return "Unopened";

  const redemptionState = attrs.find((a) => a.trait_type === "Redeemed");

  console.log("redemptionState", redemptionState);
  return redemptionState?.value === "True" ? "Redeemed" : "Unredeemed";
};

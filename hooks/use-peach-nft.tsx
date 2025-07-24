import { SEQUENCE_ENDPOINT, PEACH_NFT_CONTRACT_ADDRESS } from "@/lib/constants";
import { SequenceIndexer } from "@0xsequence/indexer";
import { useQuery } from "@tanstack/react-query";

interface TokenBalance {
  contractAddress: string;
  tokenID: string;
  tokenMetadata?: TokenMetadata;
}

export interface TokenMetadata {
  name: string;
  description?: string;
  image?: string;
  attributes: Array<{
    [key: string]: any;
  }>;
  status?: string;
}

const fetchPeachNft = async ({ tokenId }: { tokenId: string }) => {
  if (!tokenId || !PEACH_NFT_CONTRACT_ADDRESS) {
    throw new Error("Missing Args");
  }

  const sequenceEndPoint = SEQUENCE_ENDPOINT;

  if (!sequenceEndPoint) {
    throw new Error("Invalid ChainId");
  }

  const indexer = new SequenceIndexer(
    sequenceEndPoint,
    process.env.NEXT_PUBLIC_SEQUENCE_API_KEY
  );

  const nftBalances = await indexer.getTokenBalances({
    contractAddress: PEACH_NFT_CONTRACT_ADDRESS,
    tokenID: tokenId,
    includeMetadata: true,
  });

  return nftBalances.balances[0] as unknown as TokenBalance;
};

export const usePeachNft = ({ tokenId }: { tokenId: string }) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`peachNft-${tokenId}-${PEACH_NFT_CONTRACT_ADDRESS}`],
    queryFn: () => fetchPeachNft({ tokenId }),
    enabled: !!tokenId && !!PEACH_NFT_CONTRACT_ADDRESS,
  });

  return { peachNft: data, error, ...rest };
};

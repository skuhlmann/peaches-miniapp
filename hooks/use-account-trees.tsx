import { SEQUENCE_ENDPOINT, TREE_NFT_CONTRACT_ADDRESS } from "@/lib/constants";
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

const fetchNftsForAccount = async ({
  accountAddress,
  contractAddress,
}: {
  accountAddress: string;
  contractAddress?: string;
}) => {
  if (!accountAddress || !contractAddress) {
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
    contractAddress: contractAddress,
    accountAddress: accountAddress,
    includeMetadata: true,
  });

  return {
    balances: nftBalances.balances as unknown as TokenBalance[],
    page: nftBalances.page,
  };
};

export const useAccountTrees = ({
  accountAddress,
}: {
  accountAddress: string;
}) => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`accountNfts-${accountAddress}-${TREE_NFT_CONTRACT_ADDRESS}`],
    queryFn: () =>
      fetchNftsForAccount({
        accountAddress,
        contractAddress: TREE_NFT_CONTRACT_ADDRESS,
      }),
    enabled: !!TREE_NFT_CONTRACT_ADDRESS,
  });

  return { accountNfts: data?.balances, page: data?.page, error, ...rest };
};

import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import CEP18Client from '@/lib/contracts/cep18/CEP18Client';

const NETWORK_NAME = 'casper-test';

type Params = {
  contractHash: `hash-${string}`;
};

export const useGetTotalSupply = (
  { contractHash }: Params,
  options?: Omit<
    UseQueryOptions<
      number,
      unknown,
      number,
      ['total_supply', string | null | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['total_supply', contractHash],
    async () => {
      const cep18 = new CEP18Client(
        'https://airdrop.casperdash.io/v1/proxy/rpc',
        NETWORK_NAME
      );
      cep18.setContractHash(contractHash);

      const totalSupply = await cep18.totalSupply();

      return totalSupply.toNumber() / 1_000_000_000;
    },
    {
      ...options,
      enabled: !!contractHash,
      refetchOnWindowFocus: true,
    }
  );
};

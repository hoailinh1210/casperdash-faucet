import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { toCSPR } from '@/services/faucet/casperdash/user/hooks';
import { getContractPackageSupply } from '@/services/faucet/faucet/faucet.service';

type Params = {
  contractPackageHash: string;
};

export const useGetTotalSupply = (
  { contractPackageHash }: Params,
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
    ['total_supply', contractPackageHash],
    async () => {
      const { totalSupply } = await getContractPackageSupply({
        contractPackageHash: contractPackageHash,
      });

      return toCSPR(totalSupply);
    },
    {
      ...options,
      enabled: !!contractPackageHash,
      refetchOnWindowFocus: true,
    }
  );
};

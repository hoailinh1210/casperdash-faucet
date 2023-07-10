import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { CLPublicKey } from 'casper-js-sdk';

import CEP18Client from '@/lib/contracts/cep18/CEP18Client';

const NETWORK_NAME = 'casper-test';

type Params = {
  contractHash: `hash-${string}`;
  publicKey?: string | null;
};

export const useGetAccountTokenBalance = (
  { contractHash, publicKey }: Params,
  options?: Omit<
    UseQueryOptions<
      number,
      unknown,
      number,
      [
        'account_token_balance',
        string | null | undefined,
        string | null | undefined
      ]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['account_token_balance', contractHash, publicKey],
    async () => {
      const cep18 = new CEP18Client(
        'https://airdrop.casperdash.io/v1/proxy/rpc',
        NETWORK_NAME
      );
      cep18.setContractHash(contractHash);

      const totalSupply = await cep18.balanceOf(
        CLPublicKey.fromHex(publicKey!)
      );

      return totalSupply.toNumber() / 1_000_000_000;
    },
    {
      ...options,
      enabled: !!contractHash && !!publicKey,
      refetchOnWindowFocus: true,
    }
  );
};

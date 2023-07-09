import { BigNumber } from '@ethersproject/bignumber';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Big from 'big.js';
import _ from 'lodash';

import { Account, WalletAccountBalance } from './type';
import { getAccounts } from './user.service';

type UseGetBalanceParams = {
  publicKey?: string | null;
};

const MOTE_RATE = 1000000000;

export const toCSPR = (rawAmount: number | string): number => {
  try {
    const amount = Big(rawAmount)
      .div(MOTE_RATE)
      .round(9, Big.roundDown)
      .toNumber();

    return amount;
  } catch (error) {
    return 0;
  }
};

export const normalizeBalance = (account: Account): number => {
  const balance = _.get(account, 'balance');
  return balance.hex ? toCSPR(BigNumber.from(balance.hex).toNumber()) : 0;
};

export const normalizeAccountBalance = (
  account: Account
): WalletAccountBalance => {
  return {
    publicKey: _.get(account, 'publicKey', ''),
    balance: normalizeBalance(account),
  };
};

export const useGetAccountBalance = (
  { publicKey }: UseGetBalanceParams,
  options?: Omit<
    UseQueryOptions<
      WalletAccountBalance,
      unknown,
      WalletAccountBalance,
      ['account_balance', string | null | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['account_balance', publicKey],
    async () => {
      const accounts = await getAccounts({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKeys: [publicKey!],
      });
      if (!accounts || accounts.length === 0) {
        throw new Error('Can not get account');
      }

      const [account] = accounts;

      return normalizeAccountBalance(account);
    },
    {
      ...options,
      enabled: !!publicKey,
      refetchOnWindowFocus: true,
    }
  );
};

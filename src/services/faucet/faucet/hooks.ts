import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  faucetCSPR,
  FaucetCSPRParams,
  FaucetHistory,
  getAccountLock,
  GetAccountLockParams,
  GetAccountLockResult,
  getAllJobs,
  getHistories,
  Job,
  setAccountLock,
  UpdateAccountLockParams,
} from './faucet.service';

export const useFaucetCSPR = (
  options?: UseMutationOptions<unknown, unknown, FaucetCSPRParams, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: faucetCSPR,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(['jobs']);
      await queryClient.invalidateQueries(['account_asset_locks']);
      await queryClient.invalidateQueries(['histories']);

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useGetAllJobs = (
  options?: Omit<
    UseQueryOptions<Job[], unknown, Job[], [string]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(['jobs'], () => getAllJobs(), {
    ...options,
  });
};

export const useMutateSetAccountLock = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    UpdateAccountLockParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: setAccountLock,
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useGetAccountAssetLock = (
  params: GetAccountLockParams,
  options?: Omit<
    UseQueryOptions<
      GetAccountLockResult,
      unknown,
      GetAccountLockResult,
      [string, string, string]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['account_asset_locks', params.publicKey, params.assetId],
    () => getAccountLock(params),
    {
      ...options,
      enabled: !!params.publicKey && !!params.assetId,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetFauceHistories = (
  options?: Omit<
    UseQueryOptions<FaucetHistory[], unknown, FaucetHistory[], [string]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(['histories'], () => getHistories(), {
    ...options,
  });
};

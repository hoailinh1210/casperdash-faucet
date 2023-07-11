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
  getAccountLock,
  GetAccountLockParams,
  GetAccountLockResult,
  getAllJobs,
  Job,
  setAccountLock,
} from './faucet.service';

export const useFaucetCSPR = (
  options?: UseMutationOptions<unknown, unknown, FaucetCSPRParams, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: faucetCSPR,
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries(['jobs']);
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
  options?: UseMutationOptions<unknown, unknown, GetAccountLockParams, unknown>
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

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
  getAllJobs,
  Job,
} from './faucet.service';

export const useFaucetCSPR = (
  options?: UseMutationOptions<unknown, unknown, FaucetCSPRParams, unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: faucetCSPR,
    networkMode: 'offlineFirst',
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

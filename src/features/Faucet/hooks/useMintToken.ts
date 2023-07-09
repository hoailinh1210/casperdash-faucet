import { useSign } from '@casperdash/usewallet';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { CLPublicKey, DeployUtil } from 'casper-js-sdk';

import CEP18Client from '@/lib/contracts/cep18/CEP18Client';
import { deploy } from '@/services/faucet/casperdash/deploy/deploy.service';

const NETWORK_NAME = 'casper-test';

type UseMintTokenParams = {
  publicKey: string;
  contractHash: `hash-${string}`;
};

type UseMintTokenResult = {
  deployHash: string;
};

export const useMintToken = (
  options?: UseMutationOptions<
    UseMintTokenResult,
    unknown,
    UseMintTokenParams,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  const { signAsync } = useSign();

  return useMutation({
    ...options,
    mutationFn: async ({ publicKey, contractHash }) => {
      const clPublicKey = CLPublicKey.fromHex(publicKey);
      const cep18 = new CEP18Client('http://localhost:11101/rpc', NETWORK_NAME);
      const amount = 1000 * 1_000_000_000;
      cep18.setContractHash(contractHash);

      const buildedDeployJson = cep18.mint(
        {
          owner: clPublicKey,
          amount,
        },
        5_000_000_000,
        clPublicKey,
        NETWORK_NAME
      );

      const deployJson = await signAsync({
        deploy: DeployUtil.deployToJson(buildedDeployJson),
        signingPublicKeyHex: publicKey,
        targetPublicKeyHex: publicKey,
      });

      const { deployHash } = await deploy(deployJson);

      return {
        deployHash,
      };
    },
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries(['jobs']);
      options?.onSuccess?.(data, variables, context);
    },
  });
};

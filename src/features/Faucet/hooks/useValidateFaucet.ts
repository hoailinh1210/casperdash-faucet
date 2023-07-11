import { useState } from 'react';

import { useAccount } from '@casperdash/usewallet';
import { useWatch } from 'react-hook-form';

import { useCountdown } from '@/hooks/useCountDown';
import { useGetAccountBalance } from '@/services/faucet/casperdash/user/hooks';
import { useGetAccountAssetLock } from '@/services/faucet/faucet/hooks';

type Props = {
  isLoading: boolean;
};
export const useValidateFaucet = ({ isLoading }: Props) => {
  const [lockedTime, setLockedTime] = useState(0);
  const { publicKey } = useAccount();
  const {
    data: { balance } = { balance: 0 },
    isLoading: isLoadingAccountBalance,
  } = useGetAccountBalance(
    {
      publicKey,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const assetWatched = useWatch({
    name: 'asset',
  });

  const { isLoading: isLoadingLockStatus } = useGetAccountAssetLock(
    {
      publicKey: publicKey!,
      assetId: assetWatched,
    },
    {
      onSuccess: (data) => {
        if (data.isLocked) {
          setLockedTime(data.ttl * 1000 + new Date().getTime());
        } else {
          setLockedTime(0);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const { hours, minutes, seconds, isRunning } = useCountdown({
    targetDate: lockedTime,
    enabled: lockedTime > 0,
  });

  const getButtonData = (): {
    text: string | JSX.Element;
    isDisabled?: boolean;
  } => {
    if (isLoading || isLoadingAccountBalance || isLoadingLockStatus) {
      return {
        text: 'Loading...',
        isDisabled: true,
      };
    }

    if (lockedTime > 0) {
      if (!isRunning) {
        return {
          text: 'Loading...',
          isDisabled: true,
        };
      }

      return {
        text: `Wait for next request (${hours}h: ${minutes}m: ${seconds}s)`,
        isDisabled: true,
      };
    }

    if (assetWatched === 'cspr') {
      return {
        text: 'Request 10 CSPR',
        isDisabled: false,
      };
    }

    if (balance < 5) {
      return {
        text: 'Need 5 CSPR to mint',
        isDisabled: true,
      };
    }

    return {
      text: `Mint 1000 ${assetWatched} tokens`,
      isDisabled: false,
    };
  };

  return {
    ...getButtonData(),
    isRunning,
  };
};

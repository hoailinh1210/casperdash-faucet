import { useAccount } from '@casperdash/usewallet';
import { useWatch } from 'react-hook-form';

import { useGetAccountTokenBalance } from '../../hooks/useGetAccountTokenBalance';
import { Button } from '@/components/ui/button';
import { useGetAccountBalance } from '@/services/faucet/casperdash/user/hooks';

type Props = {
  isLoading: boolean;
};

export const SubmitButton = ({ isLoading }: Props) => {
  const { publicKey } = useAccount();
  const {
    data: { balance } = { balance: 0 },
    isLoading: isLoadingAccountBalance,
  } = useGetAccountBalance({
    publicKey,
  });
  const { data: tokenBalance = 0, isLoading: isLoadingTokenBalance } =
    useGetAccountTokenBalance({
      publicKey,
      contractHash:
        'hash-3cc60d4da76a8c8f32948f77b6dfda736c323ebf87b76837e82420cf5c396d12',
    });

  const assetWatched = useWatch({
    name: 'asset',
  });

  const getButtonText = () => {
    if (isLoading || isLoadingAccountBalance) {
      return 'Loading...';
    }

    if (assetWatched === 'CSPR') {
      return 'Request 10 CSPR';
    }

    if (isLoadingTokenBalance) {
      return 'Loading...';
    }

    if (balance < 5) {
      return 'Need 5 CSPR to mint';
    }

    if (tokenBalance > 1000) {
      return 'You are rich 🤑';
    }

    return `Mint 1000 ${assetWatched} tokens`;
  };

  const isDisabled = () => {
    if (isLoading || isLoadingAccountBalance) {
      return true;
    }
    if (assetWatched !== 'CSPR') {
      return balance < 5 || tokenBalance > 1000 || isLoadingTokenBalance;
    }

    return false;
  };

  return (
    <Button type="submit" disabled={isDisabled()}>
      {getButtonText()}
    </Button>
  );
};

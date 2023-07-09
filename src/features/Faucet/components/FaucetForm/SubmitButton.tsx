import { useAccount } from '@casperdash/usewallet';
import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useGetAccountBalance } from '@/services/faucet/casperdash/user/hooks';

type Props = {
  isLoading: boolean;
};

export const SubmitButton = ({ isLoading }: Props) => {
  const { publicKey } = useAccount();
  const { data: { balance } = { balance: 0 } } = useGetAccountBalance({
    publicKey,
  });
  const assetWatched = useWatch({
    name: 'asset',
  });

  const getButtonText = () => {
    if (isLoading) {
      return 'Loading...';
    }

    if (assetWatched === 'CSPR') {
      return 'Request 10 CSPR';
    }

    if (balance < 5) {
      return 'Need 5 CSPR to mint';
    }

    return `Mint 1000 ${assetWatched} tokens`;
  };

  const isDisabled = () => {
    if (isLoading) {
      return true;
    }
    if (assetWatched !== 'CSPR') {
      return balance < 5;
    }

    return false;
  };

  return (
    <Button type="submit" disabled={isDisabled()}>
      {getButtonText()}
    </Button>
  );
};

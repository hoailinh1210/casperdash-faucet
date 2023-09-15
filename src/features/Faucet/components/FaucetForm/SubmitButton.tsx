import clsx from 'clsx';

import { useValidateFaucet } from '../../hooks/useValidateFaucet';
import { Button } from '@/components/ui/button';

type Props = {
  isLoading: boolean;
};

export const SubmitButton = ({ isLoading }: Props) => {
  const { isDisabled, text, isRunning } = useValidateFaucet({ isLoading });

  return (
    <Button
      type="submit"
      className={clsx({
        'min-w-[310px]': isRunning,
        uppercase: true,
      })}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

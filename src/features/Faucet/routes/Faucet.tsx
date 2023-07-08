import {
  CasperDashConnector,
  useAccount,
  useConnect,
} from '@casperdash/usewallet';

import { FaucetForm } from '../components/FaucetForm';
import { TableAssets } from '../components/TableAssets';
import LogoImg from '@/assets/images/logo.png';
import { Button } from '@/components/ui/button';

export const Faucet = () => {
  const { connect } = useConnect({
    connector: new CasperDashConnector(),
  });
  const { status } = useAccount();

  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <div className="mt-10">
        {status === 'connected' ? (
          <div className="md:w-[600px]">
            <FaucetForm />
            <TableAssets />
          </div>
        ) : (
          <div className="grid h-screen place-items-center ">
            <div className="flex flex-col items-center">
              <a href="https://casperdash.io" target="_blank" rel="noreferrer">
                <img src={LogoImg} alt="Faucet" width={200} height={200} />
              </a>
              <Button
                className="mt-10"
                variant={'outline'}
                onClick={() => connect()}
              >
                Connect Wallet With CasperDash
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="h-10 text-center text-sm	">
          © 2023 Copyright: <a href="https://casperdash.io/">CasperDash Team</a>
        </div>
      </div>
    </div>
  );
};

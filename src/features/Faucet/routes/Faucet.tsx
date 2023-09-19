import { useAccount } from '@casperdash/usewallet';

import { FaucetForm } from '../components/FaucetForm';
import { LoginDialog } from '../components/LoginDialog';
import { TableAssets } from '../components/TableAssets';
import GitHubImg from '@/assets/images/github-mark.png';
import LogoImg from '@/assets/images/logo.png';

export const Faucet = () => {
  const { status } = useAccount();

  return (
    <div className="relative flex flex-col h-screen items-center justify-between">
      <div className="absolute top-0 right-0 p-4">
        <a
          href="https://github.com/hoailinh1210/casperdash-faucet"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 mr-4"
        >
          <img src={GitHubImg} alt="GitHub" width={30} height={40} />
        </a>
      </div>
      <div className="mt-10 p-10">
        {status === 'connected' ? (
          <div className="md:w-[600px]">
            <FaucetForm />
            <TableAssets />
          </div>
        ) : (
          <div className="grid place-items-center mt-20">
            <div className="flex flex-col items-center">
              <a href="https://casperdash.io" target="_blank" rel="noreferrer">
                <img src={LogoImg} alt="Faucet" width={200} height={200} />
              </a>
              <LoginDialog />
            </div>
          </div>
        )}
      </div>
      <div className="flex align-center justify-between p-4">
        <div className="h-10 text-center text-sm mt-2">
          © 2023: <a href="https://casperdash.io/">CasperDash Team</a>
        </div>
      </div>
    </div>
  );
};

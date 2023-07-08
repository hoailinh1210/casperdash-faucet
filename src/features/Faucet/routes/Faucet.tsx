import { FaucetForm } from '../components/FaucetForm';
import { TableAssets } from '../components/TableAssets';

export const Faucet = () => {
  return (
    <div className="flex flex-col items-center mt-10 ">
      <div className="md:w-[600px]">
        <FaucetForm />
        <TableAssets />
      </div>
    </div>
  );
};

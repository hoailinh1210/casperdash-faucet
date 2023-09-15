import request from '../request';

export const faucetCSPR = async ({
  publicKey,
}: FaucetCSPRParams): Promise<void> => {
  return request.post('/faucet/cspr', { publicKey });
};

export const getAllJobs = async (): Promise<Job[]> => {
  return request.get('/faucet/jobs');
};

export const getAccountLock = async ({
  publicKey,
  assetId,
}: GetAccountLockParams): Promise<GetAccountLockResult> => {
  return request.get(`/faucet/accounts/${publicKey}/${assetId}`);
};

export const setAccountLock = async ({
  publicKey,
  assetId,
  deployHash,
}: GetAccountLockParams): Promise<void> => {
  return request.post(`/faucet/accounts/${publicKey}/${assetId}`, {
    deployHash,
  });
};

export const getContractPackageSupply = async ({
  contractPackageHash,
}: GetContractPackageParams): Promise<GetContractPackageResult> => {
  return request.get(`/faucet/contract-packages/${contractPackageHash}/supply`);
};

export const getHistories = async (): Promise<FaucetHistory[]> => {
  return request.get('/faucet/histories');
};

export type FaucetCSPRParams = {
  publicKey: string;
};

export type GetAccountLockParams = {
  assetId: string;
  publicKey: string;
  deployHash: string;
};

export type GetAccountLockResult = {
  isLocked: boolean;
  ttl: number;
};

export type Job = {
  id: string;
  name: string;
  data: Data;
  opts: Opts;
  progress: number;
  delay: number;
  timestamp: number;
  attemptsMade: number;
  returnvalue: Returnvalue;
  finishedOn: number;
  processedOn: number;
};

export type Data = {
  toPublicKeyHex: string;
};

export type Opts = {
  attempts: number;
  delay: number;
  timestamp: number;
};

export type Returnvalue = {
  deployHash: string;
};

export type GetContractPackageParams = {
  contractPackageHash: string;
};

export type GetContractPackageResult = {
  totalSupply: string;
};

export type FaucetHistory = {
  id: string;
  toPublicKey: string;
  status: string;
  deployHash: string;
  amount: number;
  symbol: string;
  createdAt: string;
};

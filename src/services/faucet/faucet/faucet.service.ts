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
}: GetAccountLockParams): Promise<void> => {
  return request.post(`/faucet/accounts/${publicKey}/${assetId}`);
};

export type FaucetCSPRParams = {
  publicKey: string;
};

export type GetAccountLockParams = {
  assetId: string;
  publicKey: string;
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

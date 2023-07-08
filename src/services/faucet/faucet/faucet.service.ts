import request from '../request';

export const faucetCSPR = async ({
  publicKey,
}: FaucetCSPRParams): Promise<void> => {
  return request.post('/faucet/cspr', { publicKey });
};

export const getAllJobs = async (): Promise<Job[]> => {
  return request.get('/faucet/jobs');
};



export type FaucetCSPRParams = {
  publicKey: string
};


export interface Job {
  id: string
  name: string
  data: Data
  opts: Opts
  progress: number
  delay: number
  timestamp: number
  attemptsMade: number
  returnvalue: Returnvalue
  finishedOn: number
  processedOn: number
}

export interface Data {
  toPublicKeyHex: string
}

export interface Opts {
  attempts: number
  delay: number
  timestamp: number
}

export interface Returnvalue {
  deployHash: string
}

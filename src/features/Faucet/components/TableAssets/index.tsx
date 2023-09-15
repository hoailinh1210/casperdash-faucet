import { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { DataTable } from '@/components/common/data-table';
import { MiddleTruncatedText } from '@/components/common/middle-truncated-text';
import { FaucetHistory } from '@/services/faucet/faucet/faucet.service';
import { useGetFauceHistories } from '@/services/faucet/faucet/hooks';

type JobItem = {
  date: string;
  publicKey: string;
  totalAmount: string;
  status: string;
  deployHash: string;
};

const columns: ColumnDef<JobItem>[] = [
  {
    accessorKey: 'date',
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue('date')}</div>;
    },
  },
  {
    accessorKey: 'publicKey',
    header: () => <div className="text-left">Public Key</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          <a
            target="_blank"
            href={`https://testnet.cspr.live/account/${row.getValue(
              'publicKey'
            )}`}
            rel="noreferrer"
          >
            <MiddleTruncatedText>
              {row.getValue('publicKey')}
            </MiddleTruncatedText>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue('status')}</div>;
    },
  },
  {
    accessorKey: 'deployHash',

    header: () => <div className="text-left">Deploy Hash</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          <a
            target="_blank"
            href={`https://testnet.cspr.live/deploy/${row.getValue(
              'deployHash'
            )}`}
            rel="noreferrer"
          >
            <MiddleTruncatedText>
              {row.getValue('deployHash')}
            </MiddleTruncatedText>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'totalAmount',
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue('totalAmount')}</div>;
    },
  },
];

export const TableAssets = () => {
  const { data } = useGetFauceHistories({});

  const jobItems: JobItem[] = useMemo(() => {
    if (!data) return [];

    return data.map((item: FaucetHistory): JobItem => {
      return {
        date: dayjs(item.createdAt).format('DD/MM/YYYY'),
        publicKey: item.toPublicKey,
        totalAmount: `${item.amount} ${item.symbol}`,
        status: item.status,
        deployHash: item.deployHash ? item.deployHash : '',
      };
    });
  }, [data]);

  return (
    <div className="mt-10 w-full">
      <DataTable columns={columns} data={jobItems} />
    </div>
  );
};

import { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { DataTable } from '@/components/common/data-table';
import { MiddleTruncatedText } from '@/components/common/middle-truncated-text';
import { Job } from '@/services/faucet/faucet/faucet.service';
import { useGetAllJobs } from '@/services/faucet/faucet/hooks';

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
            href={`https://testnet.cspr.live/account/${row.getValue(
              'publicKey'
            )}`}
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
            href={`https://testnet.cspr.live/deploy/${row.getValue(
              'deployHash'
            )}`}
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
  const { data } = useGetAllJobs({});

  const jobItems: JobItem[] = useMemo(() => {
    if (!data) return [];

    return data.map((item: Job): JobItem => {
      let status = 'Pending';
      if (item.finishedOn) {
        if (!item.returnvalue) {
          status = 'Failed';
        } else {
          status = 'Success';
        }
      }

      return {
        date: dayjs(item.timestamp).format('DD/MM/YYYY'),
        publicKey: item.data.toPublicKeyHex,
        totalAmount: '10 CSPR',
        status: status,
        deployHash: item.returnvalue ? item.returnvalue.deployHash : '',
      };
    });
  }, [data]);

  return (
    <div className="mt-10 w-full">
      <DataTable columns={columns} data={jobItems} />
    </div>
  );
};

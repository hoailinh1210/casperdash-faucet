import { DataTable } from "@/components/common/data-table"
import { MiddleTruncatedText } from "@/components/common/middle-truncated-text"
import { Job } from "@/services/faucet/faucet/faucet.service"
import { useGetAllJobs } from "@/services/faucet/faucet/hooks"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useMemo } from "react"
  
type JobItem = {
  date: string
  publicKey: string
  totalAmount: string
  status: string
  deployHash: string
}

const columns: ColumnDef<JobItem>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {row.getValue("date")}
        </div>
      )
    }
  },
  {
    accessorKey: "publicKey",
    header: () => <div className="text-left">Public Key</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          <MiddleTruncatedText>
            {row.getValue("publicKey")}
          </MiddleTruncatedText>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {row.getValue("status")}
        </div>
      )
    }
  },
  {
    accessorKey: "deployHash",

    header: () => <div className="text-left">Deploy Hash</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          <MiddleTruncatedText>
            {row.getValue("deployHash")}
          </MiddleTruncatedText>
        </div>
      )
    }
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {row.getValue("totalAmount")}
        </div>
      )
    },
  },

]

export const TableAssets = () => {
    const { data } = useGetAllJobs({

    });

    const jobItems: JobItem[] = useMemo(() => {
      if (!data) return []

      return data.map((item: Job): JobItem => {
        let status = 'Pending';
        if (item.finishedOn) {
          if (!item.returnvalue) {
            status = 'Failed';
          } else {
            status = 'Success';
          }
        }
      

        return ({
          date: dayjs(item.timestamp).format('DD/MM/YYYY'),
          publicKey: item.data.toPublicKeyHex,
          totalAmount: '4',
          status: status,
          deployHash: item.returnvalue ? item.returnvalue.deployHash : '',
        });
      })
    }, [data])

    return (
       <div className="mt-10 w-full">
         <DataTable columns={columns} data={jobItems} />
       </div>
      // <Table className="mt-10">
      //   <TableHeader>
      //     <TableRow>
      //       <TableHead className="w-[100px]">Date</TableHead>
      //       <TableHead>Public Key</TableHead>
      //       <TableHead>Status</TableHead>
      //       <TableHead>Deploy Hash</TableHead>
      //       <TableHead>Amount</TableHead>
      //     </TableRow>
      //   </TableHeader>
      //   <TableBody>
      //     {jobItems.map((job: JobItem, index: number) => (
      //       <TableRow key={`key-${index}`}>
      //         <TableCell className="font-medium">{job.date}</TableCell>
      //         <TableCell>
      //           <MiddleTruncatedText>
      //             {job.publicKey}
      //           </MiddleTruncatedText>
      //         </TableCell>
      //         <TableCell>{job.status}</TableCell>
      //         <TableCell>
      //           <MiddleTruncatedText>
      //             {job.deployHash}
      //           </MiddleTruncatedText>
      //         </TableCell>
      //         <TableCell className="text-right">{job.totalAmount}</TableCell>
      //       </TableRow>
      //     ))}
      //   </TableBody>
      // </Table>
    )
  }
  
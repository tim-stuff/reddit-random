import { Transaction } from "@/types/sharedTypes";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  data: Transaction[];
  pageNumber: number;
};

interface TableCellProps {
  text: string;
  href?: string;
  className?: string;
}

const TransactionTable = ({ data, pageNumber }: Props) => {
  const TableHeader = ({ heading }: { heading: string }) => {
    return (
      <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
        {heading}
      </th>
    );
  };

  const TableCell = ({ text, href }: TableCellProps) => {
    return (
      <>
        {href ? (
          <td className="border-t-0 px-2 align-center border-l-0 border-r-0 text-xs w-full py-4 -hidden  text-ellipsis text-blue-500 hover:text-blue-700">
            <Link className=" " href={href}>
              {text}
            </Link>
          </td>
        ) : (
          <td className="border-t-0 px-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 max-w-fit text-center">
            {text}
          </td>
        )}
      </>
    );
  };

  return (
    <div className="overflow-x-auto p-4 ">
      <table className=" max-w-7xl min-w-full border border-collapse text-sm  items-center bg-transparent ">
        <thead>
          <tr>
            <TableHeader heading="Transaction Hash" />
            <TableHeader heading=" Block Number" />
            <TableHeader heading="To" />
            <TableHeader heading="Value in Wei" />
            <TableHeader heading="Age" />
            <TableHeader heading=" From" />
          </tr>
        </thead>
        <tbody>
          {data
            .slice((pageNumber - 1) * 20, (pageNumber - 1) * 20 + 20)
            .map((transaction, index) => (
              <tr
                key={index}
                className={`${index % 2 == 0 ? "bg-gray-100 " : ""}`}
              >
                <TableCell
                  text={transaction.hash}
                  href={`/hash/${encodeURIComponent(transaction.hash)}`}
                />
                <TableCell text={transaction.blockNumber} />
                <TableCell
                  text={transaction.to}
                  href={`/address/${encodeURIComponent(transaction.to)}`}
                />
                <TableCell text={transaction.value} />
                <TableCell text={transaction.timeStamp} />
                <TableCell
                  text={transaction.from}
                  href={`/address/${encodeURIComponent(transaction.from)}`}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

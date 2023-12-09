import { Transaction } from "@/types/sharedTypes";
import Link from "next/link";

type Props = {
  data: Transaction[];
  pageNumber: number;
};

const TransactionTable = ({ data, pageNumber }: Props) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-collapse text-sm  items-center bg-transparent ">
        <thead>
          <tr>
            <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Transaction Hash
            </th>
            <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              To
            </th>
            <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Value in Wei
            </th>
            <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Age
            </th>
            <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              From
            </th>
            <th className=" p-2 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Function Name
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice((pageNumber - 1) * 20, (pageNumber - 1) * 20 + 20)
            .map((transaction, index) => (
              <tr key={index} className={`${index % 2 == 0 && "bg-gray-100 "}`}>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blue-500 hover:text-blue-700 cursor-pointer ">
                  <Link href={`/hash/${encodeURIComponent(transaction.hash)}`}>
                    {transaction.hash}
                  </Link>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blue-500 hover:text-blue-700 cursor-pointer">
                  <Link href={`/address/${encodeURIComponent(transaction.to)}`}>
                    {transaction.to}
                  </Link>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {transaction.value}
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {transaction.timeStamp}
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blue-500 hover:text-blue-700 cursor-pointer">
                  <Link
                    href={`/address/${encodeURIComponent(transaction.from)}`}
                  >
                    {transaction.from}
                  </Link>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {transaction.method}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

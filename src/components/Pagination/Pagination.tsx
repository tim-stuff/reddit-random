import { NormalTransaction, TokenTransfer } from "@/types/sharedTypes";
import React, { Children, ReactNode, cloneElement, useState } from "react";

type Props = { children: any; addressId: string };

/**
 * Renders a higher order function for pagination
 *
 * @component
 * @param children - A React node passed as a function
 * @param addressId - The id for the address to pass down to the child
 * @returns
 */
const Pagination = ({ children, addressId }: Props) => {
  const [data, setData] = useState<NormalTransaction[] | TokenTransfer[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const ChildComponent = children;

  return (
    <>
      <ChildComponent
        addressId={addressId}
        data={data}
        setData={setData}
        pageNumber={pageNumber}
      />
      <div className="flex gap-4 m-10">
        <p>{`Current Page ${pageNumber}`}</p>
        <button
          className="border border-purple-500 text-purple-500 px-4 py-2 rounded focus:outline-none"
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded focus:outline-none"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={
            data.slice((pageNumber - 1) * 20, (pageNumber - 1) * 20 + 20)
              .length < 20
              ? true
              : false
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;

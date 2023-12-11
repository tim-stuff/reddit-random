import { Transaction } from "@/types/sharedTypes";
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
  const [data, setData] = useState<Transaction[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const ChildComponent = children;

  return (
    <>
      <ChildComponent
        key={JSON.stringify(children)}
        addressId={addressId}
        data={data}
        setData={setData}
        pageNumber={pageNumber}
      />
      <div className="flex flex-col align-middle justify-center w-full my-5">
        <div className="flex gap-4 my-4 justify-center">
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
        <p className=" text-md text-center mb-5">{`Page  ${pageNumber}`}</p>
      </div>
    </>
  );
};

export default Pagination;

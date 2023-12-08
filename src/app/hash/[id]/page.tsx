"use client";
import { HashDetails } from "@/types/sharedTypes";
import { getHashDetials } from "@/utils/services/getHashDetails";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Renders the hash details as success or error
 *
 * @component
 * @returns A component representing the hash status
 */
const HashDetails = () => {
  const params = useParams();
  const [hashDetails, setHashDetails] = useState<HashDetails | null>(null);
  const hashId = typeof params.id === "string" ? params.id : params.id[0];

  useEffect(() => {
    async function getDetails() {
      const details = await getHashDetials(hashId);
      if (details) setHashDetails(details);
    }
    getDetails();
  }, []);

  const StatusIndicator = ({ status }: { status: string }) => {
    const isSuccess = status === "1";

    return (
      <span
        className={`text-sm font-semibold ${
          isSuccess ? "text-green-500" : "text-red-500"
        }`}
      >
        {isSuccess ? "Success" : "Failure"}
      </span>
    );
  };

  if (!hashDetails) return null;

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Transaction Details</h2>
      <div className="flex gap-4">
        <p>Transaction Hash:</p>
        <p>{hashId}</p>
        <span
          className=" cursor-pointer text-xs border-purple-200 border p-2 "
          onClick={() => {
            navigator.clipboard.writeText(hashId);
          }}
        >
          copy
        </span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-gray-500">Status: </span>
        <StatusIndicator status={hashDetails.status} />
      </div>
      {hashDetails.status === "0" && (
        <div>
          <p className="text-red-500 font-semibold mb-2">Failure</p>
          <p className="text-sm text-gray-700">
            {hashDetails.errorMessage || "No error description available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default HashDetails;

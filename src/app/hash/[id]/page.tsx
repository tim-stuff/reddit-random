"use client";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import StatusIndicator from "@/components/StatusIndicator/StatusIndicator";
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

  if (!hashDetails) return null;

  return (
    <div className="p-4 pt-0 mb-4">
      <h2 className="text-lg font-semibold mb-2">Transaction Details</h2>
      <div className="border rounded-md shadow-md p-4 flex-col flex gap-4 w-fit">
        <div className="flex gap-4">
          <p>Transaction Hash:</p>
          <p className=" whitespace-normal break-all">{hashId}</p>
          <CopyBtn hashId={hashId} />
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="text-gray-500 ">Status: </span>
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
    </div>
  );
};

export default HashDetails;

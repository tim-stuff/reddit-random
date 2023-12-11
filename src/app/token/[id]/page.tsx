"use client";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import StatusIndicator from "@/components/StatusIndicator/StatusIndicator";
import { TokenDetails } from "@/types/sharedTypes";
import {
  getTokenBalanceForAccount,
  getTokenDetails,
} from "@/utils/services/getTokenDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Renders the token details
 *
 * @component
 * @returns A component representing the token details
 */
const TokenDetails = () => {
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);
  const hashId = typeof params.id === "string" ? params.id : params.id[0];
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function getDetails() {
      const details = await getTokenDetails(hashId);
      if (details) setTokenDetails(details);
    }
    getDetails();
  }, [hashId]);

  async function getBalance() {
    const details = await getTokenBalanceForAccount(hashId, searchInput);
    if (details) setTokenDetails(details);
  }

  function handleSubmit(e: React.FormEvent) {
    if (!searchInput.length) {
      setErrorMsg("Please enter a valid input.");
      return;
    }
    e.preventDefault();

    getBalance();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (errorMsg) setErrorMsg("");
    setSearchInput(event.target.value);
  }

  if (!tokenDetails) return null;

  return (
    <div className="p-4 pt-0 mb-4 ">
      <h2 className="text-xl font-semibold mb-2">Token Details</h2>
      <form onSubmit={handleSubmit} className={`md:w-full max-w-3xl my-2  `}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        <input
          type="search"
          id="default-search"
          className="p-2  text-sm text-gray-900 rounded-lg focus:outline-none border border-purple-200 max-w-xl w-full focus:border-2-purple my-2 mr-2"
          placeholder="Search account balance for this token"
          value={searchInput}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="bg-purple-500   hover:bg-purple-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>

        {errorMsg && <p className=" text-xs text-red-600 ">{errorMsg}</p>}
      </form>
      <div className="border rounded-md shadow-md p-4 flex-col flex gap-4 w-fit">
        <div className="flex gap-4">
          <p>Token Hash:</p>
          <p className=" whitespace-normal break-all">{hashId}</p>
          <CopyBtn hashId={hashId} />
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="text-gray-500 ">Status: </span>
          <StatusIndicator status={tokenDetails.status} />
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="text-gray-500 ">Result: {tokenDetails.result} </span>
        </div>
        {tokenDetails.status === "0" && (
          <div>
            <p className="text-red-500 font-semibold mb-2">Failure</p>
            <p className="text-sm text-gray-700">
              {tokenDetails.message || "No error description available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenDetails;

"use client";

import { indentifySearchInputType } from "@/utils/HelperFunctions/HelperFunctions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  header?: boolean;
};

/**
 * Renders a search bar which redirects to the relevant page depending on the input type
 * Accepts addresses, transaction hash & tokens
 * @component
 * @param props - The searchbar props
 * @param props.header - a boolean for whether the component is mounted on the header
 * @returns The search bar
 */
const SearchBar = ({ header = false }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const options = ["All Filters", "Token", "Address", "Hash"];
  const [selectValue, setSelectValue] = useState(options[0]);

  function handleSubmit(e: React.FormEvent) {
    if (!searchInput.length) {
      setErrorMsg("Please enter a valid input.");
      return;
    }
    e.preventDefault();
    switch (selectValue) {
      case "Address":
        router.push(`/address/${encodeURIComponent(searchInput)}`);
        break;
      case "Hash":
        router.push(`/hash/${encodeURIComponent(searchInput)}`);
        break;
      case "Token":
        router.push(`/token/${encodeURIComponent(searchInput)}`);
        break;
      default:
        const type = indentifySearchInputType(searchInput);
        if (!type) {
          setErrorMsg("Please enter a valid input.");
          return;
        }
        router.push(`/${type}/${encodeURIComponent(searchInput)}`);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (errorMsg) setErrorMsg("");
    setSearchInput(event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`md:w-full max-w-3xl ${
        header && pathName === "/" && "hidden"
      }`}
    >
      <div
        className={`${
          header && "border-0 py-1"
        } flex  gap-2  border-2 p-2 rounded-md align-middle`}
      >
        <label
          className="mb-2 text-sm font-bold hidden"
          aria-label="Filter"
          htmlFor="select"
        >
          Filter
        </label>
        <select
          id="select"
          className="border border-purple-100  bg-white rounded-md p-auto  focus:outline-none focus:border-purple-50 "
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-sm py-2">
              {option}
            </option>
          ))}
        </select>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        <input
          type="search"
          id="default-search"
          className="p-2  text-sm text-gray-900 rounded-lg focus:outline-none focus:border-2-purple w-full"
          placeholder="Search for a address, transaction hash or token"
          value={searchInput}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          aria-label="Search"
          className="text-white self-center p-1 h-fit  bg-purple-500 hover:bg-purple-600  font-medium rounded-lg text-sm  "
        >
          <Image src="/search.svg" width={30} height={30} alt="Search-icon" />
        </button>
      </div>
      {errorMsg && <p className=" text-xs text-red-600 ">{errorMsg}</p>}
    </form>
  );
};

export default SearchBar;

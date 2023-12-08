import PriceDisplay from "../PriceDisplay/PriceDisplay";
import SearchBar from "../SearchBar/SearchBar";

/**
 * Renders a header component with navigation, branding, and wallet connection as a server component.
 *
 * @returns The header component.
 */
const Header = () => {
  return (
    <header className="  px-4 md:px-20 py-4 flex-row justify-between items-center bg-slate-100 mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center sm:place-items-stretch border-b min-h-50">
        <PriceDisplay />

        <SearchBar header={true} />
      </div>

      <div className=" p-2 flex justify-between items-center">
        <div>
          <p className="text-2xl font-semibold">FlowScan</p>
        </div>
        <a
          href="#"
          className="border-purple-400 hover:bg-gray-100 shadow font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </a>
      </div>
    </header>
  );
};

export default Header;

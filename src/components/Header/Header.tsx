import Link from "next/link";
import ConnectWalletBtn from "../ConnectWalletBtn/ConnectWalletBtn";
import PriceDisplay from "../PriceDisplay/PriceDisplay";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

/**
 * Renders a header component with navigation, branding, and wallet connection as a server component.
 * @component
 * @returns The header component.
 */
const Header = () => {
  return (
    <header className="  px-4 md:px-20 pt-4 pb-2 flex-row justify-between items-center  mb-5 border border-b-purple-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center sm:place-items-stretch border-b min-h-50">
        <PriceDisplay />

        <SearchBar header={true} />
      </div>

      <div className="  p-2  flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="text-2xl tracking-widest font-bold flex gap-2 "
          >
            <Image
              src="/favicon.ico"
              height={30}
              width={30}
              alt="Next.js Logo"
            />{" "}
            FlowScan
          </Link>
        </div>
        <ConnectWalletBtn className="border-purple-400 hover:bg-gray-100 shadow font-bold py-2 px-4 rounded hidden md:inline-block" />
      </div>
    </header>
  );
};

export default Header;

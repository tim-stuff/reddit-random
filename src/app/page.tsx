import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";
import ConnectWalletBtn from "@/components/ConnectWalletBtn/ConnectWalletBtn";
import OpenNetworkModelBtn from "@/components/OpenNetworkModalBtn/OpenNetworkModalBtn";

/**
 * Home component representing the landing page of FlowScan.
 *
 * @component
 * @returns  A Element representing the Home component.
 */
export default function Home() {
  return (
    <>
      <main className=" px-4 md:px-24 mb-4">
        <SearchBar />
        <div className="mt-2 flex flex-col lg:flex-row  align-start gap-16 justify-center py-8 ">
          <div className="text-center py-4">
            <h2 className="text-4xl font-bold mb-4 text-left ">
              Get Started with{" "}
              <span className=" text-purple-600">FlowScan</span>
            </h2>
            <p className="text-lg text-left ">
              The Ethereum Blockchain Explorer
            </p>
            <div className="border-b my-4"></div>
            <div className="flex flex-col gap-8 ">
              <p className="text-gray-600 text-left  max-w-xl">
                {`Explore the power of decentralized finance (DeFi) and smart
                contracts on the Ethereum blockchain with FlowScan. Gain
                insights into transactions, contracts, and more to stay informed
                about the latest activities on the network. Elevate your
                understanding of Ethereum's decentralized ecosystem with
                FlowScan's comprehensive analytics.`}
              </p>
              <div className="flex justify-end gap-4 max-[410px]:flex-col flex-row">
                <ConnectWalletBtn className=" text-white border-purple-500  bg-purple-600 hover:bg-purple-700 shadow font-bold py-2 px-4 rounded w-fit" />
                <OpenNetworkModelBtn />
              </div>
            </div>
          </div>
          <div className="self-center ">
            <Image
              src="/to-the-moon.svg"
              width={"500"}
              height={"500"}
              alt="An illustration of a rocket"
            />
          </div>
        </div>
      </main>
    </>
  );
}

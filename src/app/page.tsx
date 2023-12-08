import SearchBar from "@/components/SearchBar/SearchBar";
import Header from "../components/Header/Header";
import Image from "next/image";
import ConnectWalletBtn from "@/components/ConnectWalletBtn/ConnectWalletBtn";

/**
 * Home component representing the landing page of FlowScan.
 *
 * @component
 * @returns  A Element representing the Home component.
 */
export default function Home() {
  return (
    <>
      <main className=" px-4 md:px-24">
        <SearchBar />
        <div className="flex flex-col md:flex-row  align-middle gap-10 justify-center py-4 ">
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold mb-4">
              Get Started with{" "}
              <span className=" text-purple-600">FlowScan</span>
            </h2>
            <p className="text-lg">The Ethereum Blockchain Explorer</p>
            <div className="border-b mt-4 mb-8"></div>
            <div className="flex flex-col gap-8">
              <p className="text-gray-600 text-left  max-w-xl">
                Explore the power of decentralized finance (DeFi) and smart
                contracts on the Ethereum blockchain with FlowScan. Gain
                insights into transactions, contracts, and more to stay informed
                about the latest activities on the network.
              </p>
              <div className="flex justify-end">
                <ConnectWalletBtn />
              </div>
            </div>
          </div>

          <Image
            src="/to-the-moon.svg"
            width={"500"}
            height={"500"}
            alt="An illustration of a rocket"
          ></Image>
        </div>
      </main>
    </>
  );
}

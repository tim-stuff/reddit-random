import getEtherLastPrice from "@/utils/services/getEtherLastPrice";
import getGasPrice from "@/utils/services/getGasPrice";

/**
 * Renders the latest ether and gas price as a server component
 * This component uses server functions to prefetch the prices.
 * @component
 * @returns The price display component.
 */
const PriceDisplay = async () => {
  const [ethPrice, gasPrice] = await Promise.all([
    getEtherLastPrice(),
    getGasPrice(),
  ]);

  const PriceComponent = ({
    text,
    subText,
    hoverText,
  }: {
    text: string;
    subText: string;
    hoverText: string;
  }) => {
    return (
      <div className="flex gap-1 align-middle">
        <p className="text-sm text-gray-600 self-center">{text} </p>
        <div className="group flex relative align-middle ">
          <span className=" text-purple-600 hover:text-purple-700 cursor-pointer text-sm self-center">
            {subText}
          </span>
          <span
            className="group-hover:block  transition-opacity bg-purple-600 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-8 hidden w-max mx-auto p-2"
          >
            {hoverText}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex space-x-4 pb-4 align-middle ">
      {ethPrice && (
        <PriceComponent
          text="ETH Price: "
          subText={`$${ethPrice.ethusd}`}
          hoverText={`Last updated: ${ethPrice.updatedAt}`}
        />
      )}
      {gasPrice && (
        <PriceComponent
          text="Gas:  "
          subText={`${gasPrice.currentPrice} GWEI`}
          hoverText={`Base Fee: ${gasPrice.basePrice} GWEI`}
        />
      )}
    </div>
  );
};
export default PriceDisplay;

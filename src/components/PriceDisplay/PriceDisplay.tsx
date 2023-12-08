import getEtherLastPrice from "@/utils/services/getEtherLastPrice";
import getGasPrice from "@/utils/services/getGasPrice";

/**
 * Renders the latest ether and gas price as a server component
 * This component uses server functions to prefetch the prices.
 *
 * @returns The price display component.
 */
const PriceDisplay = async () => {
  const [ethPrice, gasPrice] = await Promise.all([
    getEtherLastPrice(),
    getGasPrice(),
  ]);
  return (
    <div className="flex space-x-4 ">
      {ethPrice && (
        <div className="flex">
          <p className="text-sm text-gray-600">Eth Price: </p>
          <p className="text-purple-600 hover:text-purple-700 cursor-pointer">
            {ethPrice.ethusd}
          </p>
        </div>
      )}
      {gasPrice && (
        <div className="flex">
          <p className="text-sm text-gray-600">Gas: </p>
          <div className="group flex relative">
            <span className=" text-purple-600 hover:text-purple-700 cursor-pointer text-sm">
              {gasPrice.currentPrice} GWEI
            </span>
            <span
              className="group-hover:block  transition-opacity bg-gray-600 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-1/2 hidden w-40 mx-auto p-2"
            >
              {`Base Fee: ${gasPrice.basePrice} GWEI`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default PriceDisplay;

import axios from "axios";

type GasPrice = {
  currentPrice: number | null;
  basePrice: number | null;
};

/**
 * Fetches the latest gas price.
 * @returns  A Promise that resolves to the gas price  or null if an error occurs.

 */
export default async function getGasPrice(): Promise<null | GasPrice> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "gastracker",
        action: "gasoracle",
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data.status === "1") {
      // TODO: check whether the suggest base fee === base fee
      const { FastGasPrice, suggestBaseFee } = response.data.result;

      return {
        currentPrice: parseFloat(Number(FastGasPrice).toFixed(2)),
        basePrice: parseFloat(Number(suggestBaseFee).toFixed(2)),
      };
    } else {
      console.error("Error fetching data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

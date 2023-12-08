/**
 * Formats a Unix timestamp into a human-readable date string.
 *
 * @param timestamp The Unix timestamp to be formatted.
 * @returns The formatted date string.
 */
export function formatUnixTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return `${formattedDate} `;
}

/**
 * Determines the type of input based on predefined patterns.
 *
 * @param input - the input string to be identified
 * @returns The type of the input string or null if it does not match any.
 */
export function indentifySearchInputType(input: string) {
  // Check if the input matches an Ethereum address pattern
  const addressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
  if (addressPattern.test(input)) {
    return "address";
  }

  // Check if the input matches an Ethereum transaction hash pattern
  const txHashPattern = /^(0x)?[0-9a-fA-F]{64}$/;
  if (txHashPattern.test(input)) {
    return "hash";
  }

  // Check if the input matches an ERC-20 token address pattern (example pattern)
  const tokenPattern = /^(0x)?[0-9a-fA-F]{40}$/;
  if (tokenPattern.test(input)) {
    return "token";
  }

  return null;
}

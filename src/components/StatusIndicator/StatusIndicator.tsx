/**
 * Renders status for a status code
 *
 * @component
 * @param status - The status to be displayed in "0" or "1"
 * @returns A success or failure message depending on the status
 */
const StatusIndicator = ({ status }: { status: string }) => {
  const isSuccess = status === "1";

  return (
    <span
      className={`text-sm font-semibold ${
        isSuccess ? "text-green-500" : "text-red-500"
      }`}
    >
      {isSuccess ? " Success" : " Failure"}
    </span>
  );
};

export default StatusIndicator;

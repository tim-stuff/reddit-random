import Image from "next/image";
import React, { useState } from "react";

type Props = {
  hashId: string;
};

const CopyBtn = ({ hashId }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(hashId);
    setCopied(true);

    // Reset the "Copied" state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      className="cursor-pointer text-xs border-purple-200 border p-1 h-fit"
      aria-label="Copy hash"
      onClick={handleCopyClick}
    >
      <Image
        src={copied ? "/check.svg" : "/copy.svg"}
        height={15}
        width={15}
        alt="Copy"
      />
    </button>
  );
};

export default CopyBtn;

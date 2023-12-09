import Image from "next/image";
import React from "react";

type Props = {
  src?: string | null;
  name?: string | null;
};

const Avatar = ({ src, name }: Props) => {
  return (
    <>
      <div className="flex items-center gap-2 rounded-full">
        <Image
          src={src ? src : "/default-user.png"}
          alt="avatar"
          width={50}
          height={50}
        />
        <span className="text-xl font-semibold">{name ? name : "User"}</span>
      </div>
    </>
  );
};

export default Avatar;

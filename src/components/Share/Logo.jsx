import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 font-semibold text-xl hover:opacity-80 transition-opacity"
    >
      <div className="flex flex-col items-center">
        <Image
          width={80}
          height={80}
          src="/assets/Travele-logo.png"
          alt="this is smart garden logo"
        />
      </div>
    </Link>
  );
};

export default Logo;

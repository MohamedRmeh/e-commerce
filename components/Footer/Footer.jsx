import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold text-sky-900">
          Mox Store All Rights Reserved
        </p>
        <div className="flex gap-3">
          <Image
            className="cursor-pointer"
            alt="instagram"
            width={25}
            height={25}
            src="/icons/instagram.png"
          />
          <Image
            className="cursor-pointer"
            alt="instagram"
            width={25}
            height={25}
            src="/icons/whatsapp.png"
          />
        </div>
      </div>
    </footer>
  );
}

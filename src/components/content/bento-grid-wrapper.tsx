"use client";

import dynamic from "next/dynamic";

const BentoGrid = dynamic(() => import("./bento-grid"), { ssr: false });

export default function BentoGridWrapper() {
  return <BentoGrid />;
}

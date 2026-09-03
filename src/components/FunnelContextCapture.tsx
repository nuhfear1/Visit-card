"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureFunnelContext } from "@/lib/funnel";

export default function FunnelContextCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureFunnelContext();
  }, [pathname]);

  return null;
}

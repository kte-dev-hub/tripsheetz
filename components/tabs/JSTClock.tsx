"use client";

import { useEffect, useState } from "react";

export function JSTClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const jst = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
      );
      setTime(
        jst.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-lg font-semibold text-gray-900">
      {time || "—"}
    </span>
  );
}

"use client";

import React from "react";

type PillProps = {
  status: "completed" | "pending";
};

export default function Pill({ status }: PillProps) {
  const baseClasses = "inline-block px-3 py-1 text-sm font-medium rounded-full";

  const statusClasses =
    status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      {status === "completed" ? "Completed" : "Not Completed"}
    </span>
  );
}

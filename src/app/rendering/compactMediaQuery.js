"use client";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CompactMediaQuery() {
  const matches = useMediaQuery("(min-width:1155px)");

  return matches;
}

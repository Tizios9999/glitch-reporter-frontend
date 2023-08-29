"use client";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function compactMediaQuery() {
  const sizes = [
    {
      name: "desktopSize",
      query: "(min-width:1155px)",
    },
    {
      name: "compactSize",
      query: "(min-width: 701px) AND (max-width: 1154px)",
    },
    {
      name: "mobileSize",
      query: "(max-width: 700px)",
    },
  ];

  let size = "mobileSize";

  sizes.forEach((sizeType) => {
    const matches = useMediaQuery(sizeType.query);

    if (matches) {
      size = sizeType.name;
    }
  });

  return size;
}

import Chip from "@mui/material/Chip";

export default function renderChipField(chipData, bgColor, textColor, width) {
  return (
    <Chip
      label={chipData}
      size="small"
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        minWidth: width,
        mr: "2px",
        mt: "3px",
        mb: "3px",
      }}
    />
  );
}

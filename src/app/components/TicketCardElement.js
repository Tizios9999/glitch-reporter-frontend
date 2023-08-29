import { useContext } from "react";

import { useRouter } from "next/navigation";

import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";

import getMetadataObject from "../js/getMetadataObject";

import { AppContext } from "../contexts/AppContext";

import renderChipField from "../rendering/renderChipField";

import convertISOStringToLocalFormat from "../js/convertISOStringToLocalFormat";

export default function TicketCardElement(props) {
  const { data, headers } = props;
  const [appState] = useContext(AppContext);

  const { push } = useRouter();

  const priorityObj = getMetadataObject(
    "priorities",
    data.priorityId,
    appState.metadata
  );
  const statusObj = getMetadataObject(
    "statuses",
    data.statusId,
    appState.metadata
  );

  const id = {
    fieldTitle: "ID",
    fieldValue: data.ticketId,
    type: "id",
  };

  const customer = {
    fieldTitle: "Customer",
    fieldValue: data.customer,
    type: "normal",
  };
  const subject = {
    fieldTitle: "Subject",
    fieldValue: data.subject,
    type: "normal",
  };

  const status = {
    fieldTitle: "Status",
    fieldValue: statusObj.name,
    type: "chip",
    chipBgColor: `#${statusObj.bgColorCode}`,
    chipColor: `#${statusObj.textColorCode}`,
  };

  const priority = {
    fieldTitle: "Priority",
    fieldValue: priorityObj.name,
    type: "chip",
    chipBgColor: `#${priorityObj.bgColorCode}`,
    chipColor: `#${priorityObj.textColorCode}`,
  };

  const assignedTo = {
    fieldTitle: "Assigned to",
    fieldValue: data.assignedTo,
    type: "normal",
  };

  const lastUpdated = {
    fieldTitle: "Last Updated",
    fieldValue: convertISOStringToLocalFormat(data.lastUpdated),
    type: "normal",
  };

  const fieldsArr = [
    id,
    customer,
    subject,
    status,
    priority,
    assignedTo,
    lastUpdated,
  ];

  return (
    <Box
      sx={{
        border: "1px solid black",
        backgroundColor: "white",
        padding: "20px",
        maxWidth: "100%",
      }}
    >
      {console.log("data: ", data)}
      {fieldsArr.map((field, index) => (
        <Box key={index} sx={{}}>
          {field.type === "normal" && (
            <Typography>
              <strong>{field.fieldTitle}: </strong> {field.fieldValue}
            </Typography>
          )}
          {field.type === "chip" && (
            <Typography>
              <strong>{field.fieldTitle}: </strong>
              {renderChipField(
                field.fieldValue,
                field.chipBgColor,
                field.chipColor,
                "100px"
              )}
            </Typography>
          )}
        </Box>
      ))}
      <Button color="secondary" variant="contained">
        See Ticket
      </Button>
    </Box>
  );
}

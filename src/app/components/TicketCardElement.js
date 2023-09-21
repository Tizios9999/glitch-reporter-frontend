/* IMPORTS */
// React
import { useContext } from "react";
// Next.js
import { useRouter } from "next/navigation";
// External services
// Internal services
// Components
// Internal functions
import convertISOStringToLocalFormat from "../common/js/convertISOStringToLocalFormat";
import getScreenSize from "../common/rendering/getScreenSize";
import renderChipField from "../common/rendering/renderChipField";
import getMetadataObject from "../common/js/getMetadataObject";
// Contexts
import { AppContext } from "../contexts/AppContext";
// Material UI Components
import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Card that shows a single ticket data. Suitable for medium/smaller screens.

*/

export default function TicketCardElement(props) {
  const { data, headers } = props;
  const [appState] = useContext(AppContext);

  const { push } = useRouter();

  const size = getScreenSize();

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
    type: "normal",
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

  const handleClick = (id) => {
    push(`/tickets/${id}`);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        marginBottom: "10px",
        border: "1px solid black",
        backgroundColor: "white",
        padding: "20px",
        width: size === "mobileSize" ? "250px" : "350px",
      }}
    >
      {fieldsArr.map((field, index) => (
        <Box key={index} sx={{ display: "flex" }}>
          {field.type === "normal" && (
            <Typography>
              <strong>{field.fieldTitle}: </strong> {field.fieldValue}
            </Typography>
          )}
          {field.type === "chip" && (
            <div style={{ display: "flex" }}>
              <Typography sx={{ marginRight: "5px" }}>
                <strong>{field.fieldTitle}: </strong>
              </Typography>
              {renderChipField(
                field.fieldValue,
                field.chipBgColor,
                field.chipColor,
                "100px"
              )}
            </div>
          )}
        </Box>
      ))}
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleClick(data.ticketId)}
        sx={{
          display: "block",
          margin: "auto",
          marginTop: "10px", // Add margin-top for spacing
        }}
      >
        See Ticket
      </Button>
    </Box>
  );
}

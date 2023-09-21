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
import renderChipField from "../common/rendering/renderChipField";
import getMetadataObject from "../common/js/getMetadataObject";
// Contexts
import { AppContext } from "../contexts/AppContext";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Row component to show a single ticket data. 
This component can either be used:
- As the table header
- As a ticket data row

Suitable for large screens.

*/

export default function TicketRowElement(props) {
  const { type, data, headers } = props;

  const [appState] = useContext(AppContext);

  const { push } = useRouter();

  const TEMPLATE_COLUMNS_RATIO = "5% 20% 30% 10% 15% 20%";

  let fieldsList = [];
  let bgColor;
  let fontColor;
  let borderStyle;
  let idStyle;
  let priorityObj, statusObj;

  if (type === "header") {
    bgColor = "secondary.main";
    fontColor = "white";
    fieldsList = headers;
    borderStyle = "solid";
    idStyle = { color: "white" };
  } else if (type === "data") {
    priorityObj = getMetadataObject(
      "priorities",
      data.priorityId,
      appState.metadata
    );
    statusObj = getMetadataObject("statuses", data.statusId, appState.metadata);

    borderStyle = "hidden solid solid solid";
    idStyle = {
      color: "primary",
      cursor: "pointer",
      textDecoration: "underline dotted",
    };

    const id = {
      fieldName: data.ticketId,
      type: "id",
    };

    const customer = {
      fieldName: data.customer,
      type: "normal",
    };
    const subject = {
      fieldName: data.subject,
      type: "chipBefore",
      chipBgColor: `#${statusObj.bgColorCode}`,
      chipColor: `#${statusObj.textColorCode}`,
      chipData: statusObj.name,
    };
    const priority = {
      fieldName: priorityObj.name,
      type: "chip",
      chipBgColor: `#${priorityObj.bgColorCode}`,
      chipColor: `#${priorityObj.textColorCode}`,
    };

    const assignedTo = {
      fieldName: data.assignedTo,
      type: "normal",
    };

    const lastUpdated = {
      fieldName: convertISOStringToLocalFormat(data.lastUpdated),
      type: "normal",
    };

    bgColor = "white";
    fontColor = "black";
    fieldsList = [id, customer, subject, priority, assignedTo, lastUpdated];
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "90px",
        display: "grid",
        gridTemplateColumns: TEMPLATE_COLUMNS_RATIO,
        backgroundColor: bgColor,
        color: fontColor,
        fontWeight: "500",
        borderStyle: borderStyle,
        borderWidth: "1px",
        borderColor: "black",
      }}
    >
      {fieldsList.map((field, rowId) => {
        switch (field.type) {
          case "id":
            return (
              <div key={`${field.fieldname}${rowId}`}>
                <Typography
                  textAlign="center"
                  sx={idStyle}
                  onClick={() => {
                    props.type === "data" &&
                      push(`/tickets/${field.fieldName}`);
                  }}
                >
                  {field.fieldName}
                </Typography>
              </div>
            );
          case "normal":
            return (
              <div key={`${field.fieldname}${rowId}`}>
                <Typography textAlign="center">{field.fieldName}</Typography>
              </div>
            );
          case "chipBefore":
            return (
              <div
                key={`${field.fieldname}${rowId}`}
                style={{ display: "flex" }}
              >
                {renderChipField(
                  field.chipData,
                  field.chipBgColor,
                  field.chipColor,
                  "100px"
                )}
                <Typography>{field.fieldName}</Typography>
              </div>
            );
          case "chip":
            return (
              <div
                key={`${field.fieldname}${rowId}`}
                style={{ textAlign: "center" }}
              >
                {renderChipField(
                  field.fieldName,
                  field.chipBgColor,
                  field.chipColor,
                  "70px"
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </Box>
  );
}

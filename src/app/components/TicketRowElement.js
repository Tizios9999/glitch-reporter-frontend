import { useContext } from "react";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/navigation";

import getMetadataObject from "../js/getMetadataObject";

import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../contexts/AppContext";

import convertISOStringToLocalFormat from "../js/convertISOStringToLocalFormat";

export default function TicketRowElement(props) {
  const [authState] = useContext(AuthContext);
  const [appState] = useContext(AppContext);

  const { push } = useRouter();

  const TEMPLATE_COLUMNS_RATIO = "5% 20% 30% 10% 15% 20%";
  const HEADERS = [
    "ID",
    "Customer",
    "Subject",
    "Priority",
    "Assigned to",
    "Last Updated",
  ];

  const HEADERS_OBJ_ARR = [
    {
      fieldName: "ID",
      type: "id",
    },
    {
      fieldName: "Customer",
      type: "normal",
    },
    {
      fieldName: "Subject",
      type: "normal",
    },
    {
      fieldName: "Priority",
      type: "normal",
    },
    {
      fieldName: "Assigned to",
      type: "normal",
    },
    {
      fieldName: "Last Updated",
      type: "normal",
    },
  ];

  let fieldsList = [];
  let bgColor;
  let fontColor;
  let status;
  let borderStyle;
  let idStyle;
  let priorityObj, statusObj;

  if (props.type === "header") {
    bgColor = "secondary.main";
    fontColor = "white";
    fieldsList = HEADERS_OBJ_ARR;
    borderStyle = "solid";
    idStyle = { color: "white" };
  }

  if (props.type === "data") {
    priorityObj = getMetadataObject(
      "priorities",
      props.data.priorityId,
      appState.metadata
    );
    statusObj = getMetadataObject(
      "statuses",
      props.data.statusId,
      appState.metadata
    );

    borderStyle = "hidden solid solid solid";
    idStyle = {
      color: "primary",
      cursor: "pointer",
      textDecoration: "underline dotted",
    };

    const id = {
      fieldName: props.data.ticketId,
      type: "id",
    };

    const customer = {
      fieldName: props.data.customer,
      type: "normal",
    };
    const subject = {
      fieldName: props.data.subject,
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
      fieldName: props.data.assignedTo,
      type: "normal",
    };

    const lastUpdated = {
      fieldName: convertISOStringToLocalFormat(props.data.lastUpdated),
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
        height: "30px",
        display: "grid",
        gridTemplateColumns: TEMPLATE_COLUMNS_RATIO,
        backgroundColor: bgColor,
        color: fontColor,
        fontWeight: "500",
        textAlign: "center",
        borderStyle: borderStyle,
        borderWidth: "1px",
        borderColor: "black",
      }}
    >
      {/* <div>x</div> */}
      {fieldsList.map((field, rowId) => {
        console.log("priorObj, statusObj", priorityObj, statusObj);
        console.log("data", props.data);
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
                <Chip
                  label={field.chipData}
                  size="small"
                  sx={{
                    backgroundColor: field.chipBgColor,
                    color: field.chipColor,
                    width: "70px",
                    mr: "2px",
                    mt: "1px",
                  }}
                />
                <Typography>{field.fieldName}</Typography>
              </div>
            );
          case "chip":
            return (
              <div key={`${field.fieldname}${rowId}`}>
                <Chip
                  label={field.fieldName}
                  size="small"
                  sx={{
                    backgroundColor: field.chipBgColor,
                    color: field.chipColor,
                  }}
                />
              </div>
            );
          default:
            return null;
        }
      })}
      {/* <Chip label="Chip Filled" /> */}
    </Box>
  );
}

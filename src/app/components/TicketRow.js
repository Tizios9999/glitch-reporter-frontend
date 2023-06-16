import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TicketRow(props) {

const TEMPLATE_COLUMNS_RATIO = '5% 20% 30% 10% 15% 20%';
const HEADERS = ['Customer', 'Subject', 'Priority', 'Assigned to', 'Last Updated'];

const HEADERS_OBJ_ARR = [
    {
        fieldName: 'Customer',
        type: 'normal'
    },
    {
        fieldName: 'Subject',
        type: 'normal'
    },
    {
        fieldName: 'Priority',
        type: 'normal'
    },
    {
        fieldName: 'Assigned to',
        type: 'normal'
    },
    {
        fieldName: 'Last Updated',
        type: 'normal'
    },
]

let fieldsList = [];
let bgColor;
let fontColor;
let status;
let borderStyle;

if (props.type === 'header') {

    bgColor = 'secondary.main';
    fontColor = 'white'
    fieldsList = HEADERS_OBJ_ARR;
    borderStyle = "solid";
} 

if (props.type === 'data') {

    let priorityColorBgMap = new Map()

    priorityColorBgMap.set('low', 'Green')
    priorityColorBgMap.set('medium', 'GoldenRod') 
    priorityColorBgMap.set('high', 'OrangeRed')
    priorityColorBgMap.set('critical', 'FireBrick')

    let priorityColorMap = new Map()

    priorityColorMap.set('low', 'Black')
    priorityColorMap.set('medium', 'Black') 
    priorityColorMap.set('high', 'White')
    priorityColorMap.set('critical', 'White')

    status = props.data.status;

    borderStyle = "hidden solid solid solid";

    const customer = {
        fieldName: props.data.openingUser,
        type: 'normal'
    }
    const subject = {
        fieldName: props.data.ticketSubject,
        type: 'chipBefore',
        chipBgColor: 'primary.main',
        chipData: status,
    };
    const priority = {
        fieldName: props.data.priority,
        type: 'chip',
        chipBgColor: priorityColorBgMap.get(props.data.priority),
        chipColor: priorityColorMap.get(props.data.priority),
    };

    const assignedTo = {
        fieldName: props.data.assignedTo,
        type: 'normal',
    };

    const lastUpdated = {
        fieldName: props.data.lastUpdated,
        type: 'normal',
    };



    bgColor = 'white';
    fontColor = 'black'
    fieldsList = [ customer, subject, priority, assignedTo, lastUpdated ]
}

    return (
        <Box sx={{
            width: "100%",
            height: "30px",
            display: "grid",
            gridTemplateColumns: TEMPLATE_COLUMNS_RATIO,
            backgroundColor: bgColor,
            color: fontColor,
            fontWeight: '500',
            textAlign: 'center',
            borderStyle: borderStyle,
            borderWidth: '1px',
            borderColor: 'black',
        }}>
            
            <div>x</div>
            {fieldsList.map((field) => {
                switch (field.type) {
                  case 'normal':
                    return ( 
                        <div key={field}>
                            <Typography textAlign="center">{field.fieldName}</Typography>
                        </div>
                    )
                  case 'chipBefore':
                    return (
                        <div key={field} style={{display: 'flex'}}>
                          <Chip label={field.chipData} size="small" sx={{backgroundColor: field.chipBgColor, color: 'white', width: '70px', mr: '2px', mt: '1px'}} /><Typography>{field.fieldName}</Typography>
                        </div>
                    )
                  case 'chip':
                    return (
                        <div key={field}>
                          <Chip label={field.fieldName} size="small" sx={{backgroundColor: field.chipBgColor, color: field.chipColor}} />
                        </div>
                    )
                  default:
                    return null;
                }
            }
                
              )}
            {/* <Chip label="Chip Filled" /> */}
        </Box>   
        )
}
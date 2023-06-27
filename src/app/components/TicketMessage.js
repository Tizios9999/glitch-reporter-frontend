import { Box, Typography } from "@mui/material";


export default function TicketMessage(props) {

    return (
        <Box sx={{ border: '1px solid black' }}>
            <Box sx={{ p: '5px', display: 'flex', backgroundColor: 'primary.main', justifyContent: 'space-between'}}>
                <Typography variant="body1" color="white">{props.messageData.sender}</Typography>
                <Typography variant="body1" color="white">{props.messageData.messageDate}</Typography>
                
            </Box>
            <Box sx={{ p: '5px', minHeight: '100px'}}>
                {props.messageData.message}
            </Box>
        </Box>
    )
}
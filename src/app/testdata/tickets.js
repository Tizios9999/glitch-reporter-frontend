const tickets = () => {
    const firstTicket = {
        "ticketSubject" : "Please fix",
        "ticketId" : "0001",
        "creationDate" : "24-02-2023, 08:55",
        "priority" : "high",
        "status" : "solved",
        "openingUserId" : "A001",
        "assignedTo" : "B001",
        "lastUpdated" : "24-02-2023, 10:00",
        "messages" : [
            {
                "senderId" : "A001",
                "message" : "This stuff is not working!",
                "messageDate" : "24-02-2023, 09:00",
                "type" : "userChat"
            },
            {
                "senderId" : "B001",
                "message" : "Have you tried turning it off and on again?",
                "messageDate" : "24-02-2023, 09:07",
                "type" : "userChat"
            },
            {
                "senderId" : "A001",
                "message" : "Cool! Now it works! You're the best!",
                "messageDate" : "24-02-2023, 09:59",
                "type" : "userChat"
            },
            {
                "senderId" : "B001",
                "message" : "System message: Ticket status now is -Solved-",
                "messageDate" : "24-02-2023, 10:00",
                "type" : "systemMessage"
            },
            ],
    }

    const secondTicket = {
        "ticketSubject" : "Can you fix it pretty please?",
        "ticketId" : "0002",
        "creationDate" : "15-03-2023, 12:55",
        "priority" : "medium",
        "status" : "pending",
        "openingUserId" : "A002",
        "assignedTo" : "B002",
        "lastUpdated" : "22-03-2023, 17:01",
        "messages" : [
            {
                "senderId" : "A002",
                "message" : "Hey can you fix this?",
                "messageDate" : "15-03-2023, 12:59",
                "type" : "userChat"
            },
            {
                "senderId" : "B002",
                "message" : "Ok... I will let you know if I feel like it",
                "messageDate" : "16-03-2023, 16:07",
                "type" : "userChat"
            },
            {
                "senderId" : "A002",
                "message" : "...Hello???",
                "messageDate" : "22-03-2023, 17:01",
                "type" : "userChat"
            },
            ],
        }

    const ticketsArr = [firstTicket, secondTicket]


    return ticketsArr;

}

export default tickets;
export default [
    {
        "ticketSubject" : "Please fix",
        "ticketId" : "0001",
        "creationDate" : "24-02-2023, 08:55",
        "priority" : "high",
        "status" : "solved",
        "openingUser" : "Davide",
        "assignedTo" : "Guy",
        "lastUpdated" : "24-02-2023, 10:00",
        "topic": "Feature malfunction",
        "messages" : [
            {
                "sender" : "Davide",
                "message" : "This stuff is not working!",
                "messageDate" : "24-02-2023, 09:00",
                "type" : "userChat"
            },
            {
                "sender" : "Guy",
                "message" : "Have you tried turning it off and on again?",
                "messageDate" : "24-02-2023, 09:07",
                "type" : "userChat"
            },
            {
                "sender" : "Davide",
                "message" : "Cool! Now it works! You're the best!",
                "messageDate" : "24-02-2023, 09:59",
                "type" : "userChat"
            },
            {
                "sender" : "Guy",
                "message" : "System message: Ticket status now is -Solved-",
                "messageDate" : "24-02-2023, 10:00",
                "type" : "systemMessage"
            },
            ],
    },
    {
        "ticketSubject" : "Can you fix it pretty please?",
        "ticketId" : "0002",
        "creationDate" : "15-03-2023, 12:55",
        "priority" : "medium",
        "status" : "pending",
        "openingUser" : "Karen",
        "assignedTo" : "Charlie",
        "lastUpdated" : "22-03-2023, 17:01",
        "topic": "Feature malfunction",
        "messages" : [
            {
                "sender" : "Karen",
                "message" : "Hey can you fix this?",
                "messageDate" : "15-03-2023, 12:59",
                "type" : "userChat"
            },
            {
                "sender" : "Charlie",
                "message" : "Ok... I will let you know if I feel like it",
                "messageDate" : "16-03-2023, 16:07",
                "type" : "userChat"
            },
            {
                "sender" : "Karen",
                "message" : "...Hello???",
                "messageDate" : "22-03-2023, 17:01",
                "type" : "userChat"
            },
            ],
        },
        {
            "ticketSubject" : "Resolve this! Now!",
            "ticketId" : "0003",
            "creationDate" : "02-04-2023, 06:00",
            "priority" : "critical",
            "status" : "pending",
            "openingUser" : "Karen",
            "assignedTo" : "Guy",
            "lastUpdated" : "02-04-2023, 06:01",
            "topic": "Feature malfunction",
            "messages" : [
                {
                    "sender" : "Karen",
                    "message" : "Resolve this!",
                    "messageDate" : "02-04-2023, 06:00",
                    "type" : "userChat"
                },
                {
                    "sender" : "Guy",
                    "message" : "No.",
                    "messageDate" : "02-04-2023, 06:01",
                    "type" : "userChat"
                },
                {
                    "sender" : "Guy",
                    "message" : "System message: Ticket status now is -Closed-",
                    "messageDate" : "02-04-2023, 06:01",
                    "type" : "systemMessage"
                },
                ],
            }
]
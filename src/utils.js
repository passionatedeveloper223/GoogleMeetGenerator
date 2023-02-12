export function createEvent() {
    const event = {
        summary: "Something Random",
        location: "Kigali Rwanda, Africa",
        description:
            "A chance to hear more about Google's developer products.",
        start: {
            dateTime: "2023-05-28T09:00:00-07:00",
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: "2023-05-28T17:00:00-07:00",
            timeZone: "America/Los_Angeles",
        },
        recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
        attendees: [
            { email: "lpage@example.com" },
            { email: "sbrin@example.com" },
        ],
        reminders: {
            useDefault: false,
            overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
            ],
        },
        conferenceDataVersion: 1,
        conferenceData: {
            createRequest: {
                requestId: "98jhh32fsd",
                conferenceSolutionKey: {
                    type: "hangoutsMeet",
                },
            },
        },
    };

    const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
    });

    request.execute(function (event) {
        console.log(
            "%c EVENT",
            "color: green; font-size: 20px",
            event
        );

        const eventPatch = {
            conferenceData: {
                createRequest: { requestId: "7qxalsvy0e" },
            },
        };

        gapi.client.calendar.events
            .patch({
                calendarId: "primary",
                eventId: event.id,
                resource: eventPatch,
                sendNotifications: true,
                conferenceDataVersion: 1,
            })
            .execute(function (ev) {
                console.log(
                    "%c EV",
                    "color: green; font-size: 20px",
                    ev.hangoutLink
                );
                if(confirm("join meeting")) {
                    window.location.href = ev.hangoutLink
                }
                
            });
    });
}
import axios from "axios";

const addEvent = async () => {
  const data = {
    reminders: [
      {
        action: "popup",
        minutes: -60,
      },
    ],
    dateandtime: {
      timezone: "Asia/Kolkata",
      start: "20221130T180000Z",
      end: "20221130T183000Z",
    },
    attach: {
      fileId: "1669786154601000001,1669786188806000001",
    },
    title: "test invitation",
    attendees: [
      {
        email: "user2@pavi1.com",
        status: "NEEDS-ACTION",
      },
    ],
    conference: "zmeeting",
    };
    console.log("data: ", data)
//   const options = {
//     method: "GET",
//     url: `https://calendar.zoho.com/api/v1/calendars/849d6badb4e04acc91860c43db0fb109/events?eventdata=${data}`,
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//     },
//     // data: {
//     //   title: "Event name",
//     //   datetime_start: "2024-06-01 10:00",
//     //   datetime_end: "2024-06-01 11:00",
//     //   timezone: "America/Los_Angeles",
//     //   recurring_rule: "FREQ=DAILY;COUNT=2",
//     //   landing_page_template_id: "default",
//     //   rsvp_form_id: "default",
//     // },
//   };

//   await axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
};

export default addEvent;

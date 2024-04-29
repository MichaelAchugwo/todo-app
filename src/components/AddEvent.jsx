import axios from "axios";

const addEvent = async () => {
  const options = {
    method: "POST",
    url: "https://api.addevent.com/calevent/v2/events",
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      title: "Event name",
      datetime_start: "2024-06-01 10:00",
      datetime_end: "2024-06-01 11:00",
      timezone: "America/Los_Angeles",
      recurring_rule: "FREQ=DAILY;COUNT=2",
      landing_page_template_id: "default",
      rsvp_form_id: "default",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default addEvent;

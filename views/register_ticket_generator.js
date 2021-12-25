const { status_element, activity_element } = require("./ticket_elements");
const url = process.env.REDMINE_URL;

let divider = {
  type: "divider",
};

let ticket_title = (ticket_no, tracker_name, subject) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    // text: "<https://sample.jp|バグ #40197> : *サポートフィーの算出の修正*",
    text: `*<${url}/issues/${ticket_no}|${tracker_name} #${ticket_no}> : ${subject}*`,
  },
  block_id: `${ticket_no}-title`
});

let register_time = (ticket_no) => ({
  type: "section",
  text: {
    type: "plain_text",
    text: "　作業時間",
  },
  accessory: {
    type: "timepicker",
    initial_time: "01:30",
    placeholder: {
      type: "plain_text",
      text: "Select time",
    },
    action_id: "time",
  },
  block_id: `${ticket_no}-time`,
});

let register_coment = (ticket_no) => ({
  type: "input",
  element: {
    type: "plain_text_input",
    multiline: true,
    action_id: "comment",
    placeholder: {
      type: "plain_text",
      text: "コメント",
    },
  },
  label: {
    type: "plain_text",
    text: " ",
  },
  block_id: `${ticket_no}-comment`,
  optional: true,
});

let remove_ticket_btn = (ticket_no) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: " ",
  },
  accessory: {
    type: "button",
    text: {
      type: "plain_text",
      text: "削除",
    },
    value: ticket_no,
    action_id: "rm-ticket-btn",
  },
  block_id: ticket_no,
});

let ticket_generator = (ticket_no, tracker_name, subject, status) => {
  return [
    divider,
    ticket_title(ticket_no, tracker_name, subject),
    {
      type: "actions",
      elements: [status_element(status), activity_element],
      block_id: `${ticket_no}-options`
    },
    register_time(ticket_no),
    register_coment(ticket_no),
    remove_ticket_btn(ticket_no),
    divider,
  ];
};

module.exports = ticket_generator;

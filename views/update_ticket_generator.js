let { status_element, activity_element } = require("./ticket_elements");


let divider = {
  type: "divider",
};


let ticket_title = () => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: "<https://sample.jp|バグ #40197> : *サポートフィーの算出の修正*",
  },
});

let register_time = () => ({
  type: "section",
  text: {
    type: "plain_text",
    text: "作業時間",
  },
  accessory: {
    type: "timepicker",
    initial_time: "01:30",
    placeholder: {
      type: "plain_text",
      text: "Select time",
      emoji: true,
    },
    action_id: "timepicker-action",
  },
});

let register_coment = () => ({
  type: "input",
  element: {
    type: "plain_text_input",
    multiline: true,
    action_id: "plain_text_input-action",
    placeholder: {
      type: "plain_text",
      text: "コメント",
      emoji: true,
    },
  },
  label: {
    type: "plain_text",
    text: " ",
    emoji: true,
  },
});

let remove_ticket_btn = {
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
      emoji: true,
    },
    value: "click_me_123",
    action_id: "button-action",
  },
};

let ticket_generator = async (statuses, activities) => {
  return [
    divider,
    ticket_title(),
    {
      type: "actions",
      elements: [
        await status_element(statuses),
        await activity_element(activities),
      ],
    },
    register_time(),
    register_coment(),
    remove_ticket_btn,
    divider,
    divider,
  ];
};

module.exports = ticket_generator
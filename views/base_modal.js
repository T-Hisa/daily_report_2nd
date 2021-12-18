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

let ticket_generator = async () => {
  return [
    divider,
    ticket_title(),
    {
      type: "actions",
      elements: [
        await status_element([
          { id: 1, name: "新規" },
          { id: 2, name: "進行中" },
          { id: 3, name: "フィードバック" },
        ]),
        await activity_element([
          { id: 8, name: "開発" },
          { id: 9, name: "テスト" },
          { id: 10, name: "会議・検討" },
        ]),
      ],
    },
    register_time(),
    register_coment(),
    remove_ticket_btn,
    divider,
    divider,
  ];
};

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

let add_ticket_form = {
  dispatch_action: true,
  type: "input",
  element: {
    type: "plain_text_input",
    action_id: "plain_text_input-action",
  },
  // hint: {
  //   type: "plain_text",
  //   text: "#47516 'チケット題名'   　　　　あ　",
  // },
  label: {
    type: "plain_text",
    text: "Ticket No.",
    emoji: true,
  },
};

let add_ticket_btn = {
  type: "section",
  text: {
    type: "mrkdwn",
    text: " ",
  },
  accessory: {
    type: "button",
    text: {
      type: "plain_text",
      text: "追加",
      emoji: true,
    },
    value: "click_me_123",
    action_id: "button-action",
  },
};

let modal_framework = {
  type: "modal",
  title: {
    type: "plain_text",
    text: "My App",
  },
  submit: {
    type: "plain_text",
    text: "Submit",
  },
  close: {
    type: "plain_text",
    text: "Cancel",
  },
};

let base_modal = async () => ({
  ...modal_framework,
  blocks: [
    // ... await ticket_generator(),
    add_ticket_form,
    add_ticket_btn,
  ],
});

module.exports = base_modal;

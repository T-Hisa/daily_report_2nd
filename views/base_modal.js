let ticket_generator = require("./register_ticket_generator");

let divider = {
  type: "divider",
};

let api_key_input_form = {
  type: "input",
  element: {
    type: "plain_text_input",
    action_id: "api-action",
    placeholder: {
      type: "plain_text",
      text: "APIキーを入力",
    },
  },
  label: {
    type: "plain_text",
    text: "API Key",
  },
  block_id: "api-key",
};

let add_ticket_form = {
  dispatch_action: true,
  type: "input",
  element: {
    type: "plain_text_input",
    action_id: "add-ticket-txt",
    placeholder: {
      type: "plain_text",
      text: "チケット番号を入力",
    },
    dispatch_action_config: {
      trigger_actions_on: ["on_character_entered"],
      // trigger_actions_on: ["on_enter_pressed"],
    },
    max_length: 5,
  },
  label: {
    type: "plain_text",
    text: "Ticket No",
  },
  block_id: "ticket-no",
};

// このボタンに、チャンネルのIDを持たせて、最後のレポート送信時にチャンネルに送信する。
let add_ticket_btn = (channel_id) => ({
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
    },
    value: channel_id,
    action_id: "add-ticket-btn",
  },
  block_id: 'add-btn'
});

let modal_framework = {
  type: "modal",
  callback_id: "submit-today-report",
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

let base_modal = (channel_id) => ({
  ...modal_framework,
  blocks: [
    // ...ticket_generator("some", "tracker", "subject"),
    divider,
    api_key_input_form,
    divider,
    add_ticket_form,
    add_ticket_btn(channel_id),
  ],
});

// let base_modal = {
//   ...modal_framework,
//   blocks: [
//     divider,
//     api_key_input_form,
//     divider,
//     add_ticket_form,
//     add_ticket_btn,
//   ],
// };

module.exports = base_modal;

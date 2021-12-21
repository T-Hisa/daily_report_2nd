let ticket_generator = require("./register_ticket_generator");

let divider = {
  type: "divider",
};

let api_key_input_form = {
  type: "input",
  element: {
    type: "plain_text_input",
    action_id: "plain_text_input-action",
  },
  label: {
    type: "plain_text",
    text: "API Key",
    emoji: true,
  },
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
  },
  // hint: {
  //   type: "plain_text",
  //   text: "#47516 'チケット題名'   　　　　あ　",
  // },
  label: {
    type: "plain_text",
    text: "Ticket No",
  },
};

// このボタンに、チャンネルのIDを持たせて、最後のレポート送信時にチャンネルに送信する。
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
    },
    value: "add-ticket",
    action_id: "add-ticket-btn",
  },
};

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

// let base_modal = async () => ({
//   ...modal_framework,
//   blocks: [
//     ...(await ticket_generator(
//       [
//         { id: 1, name: "新規" },
//         { id: 2, name: "進行中" },
//         { id: 3, name: "フィードバック" },
//       ],
//       [
//         { id: 8, name: "開発" },
//         { id: 9, name: "テスト" },
//         { id: 10, name: "会議・検討" },
//       ]
//     )),
//     add_ticket_form,
//     add_ticket_btn,
//   ],
// });

let base_modal = {
  ...modal_framework,
  blocks: [
    divider,
    api_key_input_form,
    divider,
    add_ticket_form,
    add_ticket_btn,
  ],
};

module.exports = base_modal;

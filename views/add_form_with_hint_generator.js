const form_with_hint_generator = (text, block_count) => ({
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
    initial_value: "",
  },
  hint: {
    type: "plain_text",
    text,
  },
  label: {
    type: "plain_text",
    text: "Ticket No",
  },
  block_id: "ticket-no",
  optional: block_count > 5
});

module.exports = form_with_hint_generator;

const status_options_base = require("./options/developer_issue_statuses.json");
const time_activity_options_base = require("./options/time_activities.json");

const gen_options = (options) => {
  return options.map((v) => ({
    text: {
      type: "plain_text",
      text: v.name,
    },
    value: String(v.id),
  }));
};

const status_options = gen_options(status_options_base);
const time_activity_options = gen_options(time_activity_options_base);

const initial_option_generator = (initial_option) => ({
  text: {
    type: 'plain_text',
    text: initial_option['name'],
  },
  value: String(initial_option['id'])
})

const status_element = (initial_option) => ({
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Ticket Status",
  },
  options: status_options,
  initial_option: initial_option_generator(initial_option),
  action_id: "status",
});

const activity_element = {
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Activity Type",
  },
  options: time_activity_options,
  initial_option: time_activity_options[0],
  action_id: "activity",
};

module.exports = { status_element, activity_element };

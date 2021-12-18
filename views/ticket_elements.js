// const axios = require("axios");
let base_url = process.env.REDMINE_URL;

let build_options = (values) => {
  return values.map((v) => ({
    text: {
      type: "plain_text",
      text: v.name,
    },
    value: String(v.id),
  }));
};

let gen_options = async (options, type) => {
  // 一度サーバから選択肢を取得していたら、再度取得処理は行わない。
  if (options.length === 0) {
    try {
      let end_point = "";
      if (type === "issue_statuses") {
        end_point = "/issue_statuses.json";
      } else if (type === "time_entry_activities") {
        end_point = "/enumerations/time_entry_activities.json";
      } else {
        console.error("Invalid element type !!");
        return;
      }
      let url = base_url + end_point;
      axios.get(url).then((res) => {
        let data = res["data"][type];
        options = data.map((option) => ({
          id: option.id,
          name: option.name,
        }));
        return build_options(options);
      });
      axios;
    } catch (e) {
      console.error(e);
    }
  } else {
    return await new Promise((resolve) => {
      setTimeout(resolve, 500)
    }).then(() => {
      console.log('setTimeout was done!')
      return build_options(options)
    })
    // return build_options(options)
  }
};

let status_element = async (statuses) => ({
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Ticket Status",
  },
  options: await gen_options(statuses, "issue_statuses"),
  action_id: "actionId-0",
});

let activity_element = async (activities) => ({
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Activity Type",
  },
  options: await gen_options(activities, "time_entry_activities"),
  action_id: "actionId-3",
});

module.exports = { status_element, activity_element };

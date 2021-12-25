const axios = require("axios");
const { form_with_hint_generator, ticket_generator } = require("../views");
const activity_options = require("../views/options/time_activities.json");

const BASE_URL = process.env.REDMINE_URL;

const insert_ticket_form = (target_blocks, insert_blocks) => {
  // 挿入先は、最後から3番目の位置
  const insert_index = target_blocks.length - 3;
  target_blocks.splice(insert_index, 0, ...insert_blocks);
};

const remove_ticket_form = (blocks, ticket_no) => {
  const remove_index = blocks.findIndex((b) => b["block_id"] === ticket_no) - 5;
  blocks.splice(remove_index, 7);
};

const replace_add_ticket_form = (blocks, text) => {
  const replace_index = blocks.length - 2;
  blocks.splice(
    replace_index,
    1,
    form_with_hint_generator(text, blocks.length)
  );
};

const header_generator = (api_key) => ({
  headers: {
    "X-Redmine-API-Key": api_key,
  },
});

const is_number_validate = (ticket_no, blocks) => {
  if (!Number(ticket_no)) {
    const hint_word = "This field must be number!";
    console.error(hint_word);
    replace_add_ticket_form(blocks, hint_word);
    return false;
  }
  return true;
};

const is_already_exist = (ticket_no, values, blocks) => {
  const block_ids_withtime = Object.keys(values).filter(
    (value) => value.indexOf("time") > -1
  );
  const ticket_nos = block_ids_withtime.map((value) =>
    value.replace("-time", "")
  );
  if (ticket_nos.indexOf(ticket_no) > -1) {
    const hint_word = `ticket_no ${ticket_no} is already decrared! Please set another ticket_no.`;
    replace_add_ticket_form(blocks, hint_word);
    return false;
  }
  return true;
};

const update_hint_word_for_txt_action = async (
  ticket_no,
  origin_blocks,
  api_key
) => {
  const header = header_generator(api_key);
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise processing!!!");
        return resolve("result");
      }, 100);
    });
    // const issue_response = await axios.get(issue_url, header)
    // const issue = issue_response['data']['issue']
    // const { subject, tracker } = issue;
    // const hint_word = `#${ticket_no}: ${tracker}- ${subject}
    const hint_word = `#${ticket_no}:サポート AzurePlanにてSendGridの請求が反映されない`;
    replace_add_ticket_form(origin_blocks, hint_word);
  } catch (e) {}
  console.log("Promise processed!");
};

const normal_adding_process = async (ticket_no, origin_blocks, api_key) => {
  const header = header_generator(api_key);
  const issue_url = `/issues/${ticket_no}.json`;
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise processing!!!");
        return resolve("result");
      }, 100);
    });
    // const issue_response = await axios.get(issue_url, header)
    // const issue = issue_response['data']['issue']
    // const { subject, tracker, status } = issue;
    // const tracker_name = tracker['name']
    // const hint_word = `#${ticket_no} ${subject}`
  } catch (e) {
    console.error(e);
    console.error("add-ticket-txt axios error!");
  }
  console.log("Promise processed!");
  const status = { id: 2, name: "進行中" };
  const ticket_update_blocks = ticket_generator(
    ticket_no,
    "tracker",
    "subject",
    status
  );
  insert_ticket_form(origin_blocks, ticket_update_blocks);
  replace_add_ticket_form(origin_blocks, " ");
};

const send_status_options = {
  1: "【進行中】",
  2: "【進行中】",
  4: "【進行中】",
  11: "【進行中】",
  3: "【終了】",
  5: "【終了】",
  6: "【終了】",
  7: "【終了】",
};

const get_activity_name = (activity_id) => {
  return activity_options.find((activity) => activity["id"] == activity_id)[
    "name"
  ];
};

const send_name_section = (name) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `*${name}*'s today done list are followings.`,
  },
});

const send_section_title = (status) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: status,
  },
});

const send_content = (title, activity_name, time, comment) => {
  if (String(time).length === 1) {
    time = String(register_time) + ".0";
  }
  let text;
  if (!!comment) {
    text = `\n\t\t○ ${comment}`;
  } else {
    text = "";
  }
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ` ●  ${title} : ${activity_name} : ${time} Hours${text}`,
    },
  };
};

const get_username = (api_key) => {
  let get_user_url = BASE_URL + "/users/current.json";
  const header = header_generator(api_key)
  // const {lastname} =  (await axios.get(get_user_url, header))['data']['user];
  const lastname = "Hisatsune";
  return lastname
}

const make_send_blocks = async (write_contents, api_key, username) => {
  const blocks = [];
  const header = header_generator(api_key);
  blocks.push(send_name_section(username));
  const section_send_count = {};

  Object.values(write_contents).forEach((write_content) => {
    // const write_content = write_content[ticket_no]
    const { status_id, activity_id, comment, time, title } = write_content;
    const activity_name = get_activity_name(activity_id);
    let section_name = send_status_options[status_id];
    // activity_name が "会議・レビュー・指導 "
    if (activity_name === "会議・レビュー・指導") {
      section_name = "【MTG】";
    }
    const section_count = section_send_count[section_name];
    if (section_count) {
      section_send_count[section_name] += 1;
    } else {
      section_send_count[section_name] = 1;
      if (section_name === "【進行中】") {
        blocks.splice(1, 0, send_section_title(section_name));
      } else {
        blocks.push(send_section_title(section_name));
      }
    }

    const content = send_content(title, activity_name, time, comment);

    const section_init_within_blocks_index = blocks.findIndex((block) => {
      return block["text"]["text"] === section_name;
    });

    const insert_index =
      section_init_within_blocks_index + section_send_count[section_name];
    blocks.splice(insert_index, 0, content);
  });
  return blocks;
};

const register_time = (ticket_no, time, activity_id, comment, api_key) => {
  let register_time_url = BASE_URL + "/time_entries.json";
  let header = header_generator(api_key);
  let body = {
    time_entry: {
      issue_id: ticket_no,
      hours: time,
      activity_id: activity_id,
      comments: comment,
    },
  };
  return axios.post(register_time_url, body, header);
};

const update_ticket = (ticket_no, status_id, api_key) => {
  let update_ticket_url = BASE_URL + `/issues/${ticket_no}.json`;
  let header = header_generator(api_key);
  let body = {
    issue: {
      status_id,
    },
  };
  return axios.put(update_ticket_url, body, header);
};

module.exports = {
  is_number_validate,
  is_already_exist,
  normal_adding_process,
  update_hint_word_for_txt_action,
  remove_ticket_form,
  make_send_blocks,
  get_username
};

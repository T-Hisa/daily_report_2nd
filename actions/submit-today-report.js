const { app } = require("../app");
const { make_send_blocks } = require("./utils");

const make_write_contents = (values) => {
  let ticket_no;
  const write_contents = {};
  for (let value of Object.keys(values)) {
    switch (true) {
      case value.indexOf("-options") > -1:
        ticket_no = value.replace("-options", "");
        const status_id = values[value]["status"]["selected_option"].value;
        const activity_id = values[value]["activity"]["selected_option"].value;
        write_contents[ticket_no] = {
          status_id,
          activity_id,
        };
        continue;
      case value.indexOf("-comment") > -1:
        ticket_no = value.replace("-comment", "");
        const comment = values[value]["comment"].value;
        write_contents[ticket_no]["comment"] = comment;
        continue;
      case value.indexOf("-time") > -1:
        ticket_no = value.replace("-time", "");
        const time_dict = values[value]["time"]["selected_time"];
        let hour = "";
        let minute = "";
        let flag = true;
        for (let t of Object.keys(time_dict)) {
          if (flag) {
            if (time_dict[t] !== ":") {
              hour += time_dict[t];
            } else {
              flag = false;
            }
          } else {
            minute += time_dict[t];
          }
        }
        hour = Number(hour);
        minute = Number(minute) / 60;
        let register_time = hour + minute;
        // if (String(register_time).length === 1) {
        //   register_time = String(register_time) + '.0'
        // }
        write_contents[ticket_no]["time"] = register_time;
        continue;
    }
  }
  return write_contents;
};

const extract_title_blocks = (blocks, write_contents) => {
  for (let block of blocks) {
    let { block_id } = block;
    if (block_id.indexOf("-title") > -1) {
      const ticket_no = block_id.replace("-title", "");
      const text = block["text"]["text"];
      write_contents[ticket_no]["title"] = text;
    }
  }
};

app.view(
  "submit-today-report",
  async ({ ack, body, payload, view, context, client, logger }) => {
    // ack();

    const blocks = view["blocks"];
    const block_length = blocks.length;

    const add_btn = blocks[block_length - 1];
    const channel_id = add_btn["accessory"]["value"];
    const values = view.state.values;

    const write_contents = make_write_contents(values);
    extract_title_blocks(blocks, write_contents);

    const api_key = values['api-key']['api-action']['value']
    const generate_blocks = await make_send_blocks(write_contents, api_key);

    try {
      const result = app.client.chat.postMessage({
        token: context.botToken,
        channel: channel_id,
        blocks: generate_blocks
      });
      console.log(`result is ${result}`)
    } catch (e) {
      console.error(e);
      console.error("postMessage Error !!!!!");
    }
  }
);

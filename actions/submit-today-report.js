const { app } = require("../app");
const {
  make_send_blocks,
  get_username,
  make_write_contents,
} = require("./utils");

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

app.view("submit-today-report", async ({ ack, view, context, client }) => {
  const blocks = view["blocks"];
  const block_count = blocks.length;
  // チケットがひとつも追加されていない状態
  if (block_count < 6) {
    console.log("please generate any ticket.");
    return;
  }
  const values = view.state.values;
  const api_key = values["api-key"]["api-action"]["value"];

  // api-key が間違っていたら、エラー発生
  let username = "";
  try {
    username = get_username(api_key);
  } catch {
    console.log(`wrong api_key ${api_key}`);
    return;
  }

  const block_length = blocks.length;
  const add_btn = blocks[block_length - 1];
  const channel_id = add_btn["accessory"]["value"];

  const write_contents = make_write_contents(values);
  extract_title_blocks(blocks, write_contents);

  const [generate_blocks] = await make_send_blocks(
    write_contents,
    api_key,
    username
  );

  ack();
  try {
    const result = await client.chat.postMessage({
      token: context.botToken,
      channel: channel_id,
      blocks: generate_blocks,
    });
    console.log(`result is ${result}`);
  } catch (e) {
    console.error(e);
    console.error("postMessage Error !!!!!");
  }
});

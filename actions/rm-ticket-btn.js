const { app } = require("../app");
const delete_list = require("./constants/delete_list");
const { remove_ticket_form } = require("./utils");

app.action("rm-ticket-btn", async ({ ack, body, client, context, payload }) => {
  ack();
  const view = body["view"];
  const view_id = view["id"];
  const values = view.state.values;
  console.log(`values are ${values}`);
  for (let delete_target of delete_list) {
    delete view[delete_target];
  }

  const ticket_no = payload["value"];
  const blocks = view["blocks"];
  console.log(`blocks is ${blocks}`);
  console.log(`blocks[0].keys is ${Object.keys(blocks[0])}`);
  console.log(`blocks.length is ${blocks.length}`);
  console.log(`values.keys is ${Object.keys(values)}`);
  remove_ticket_form(blocks, ticket_no);

  try {
    await client.views.update({
      token: context.botToken,
      view: view,
      view_id: view_id,
    });
  } catch {
    console.error("view update error at txt action!");
  }
});

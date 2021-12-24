const { app } = require("../app");
const delete_list = require("./constants/delete_list");
const {
  is_number_validate,
  is_already_exist,
  normal_adding_process,
  update_hint_word_for_txt_action,
} = require("./utils");

app.action("add-ticket-txt", async ({ ack, body, client, context }) => {
  ack();
  const view = body["view"];
  const view_id = view["id"];
  const values = view.state.values;
  const ticket_no = values["ticket-no"]["add-ticket-txt"]["value"];

  for (let delete_target of delete_list) {
    delete view[delete_target];
  }
  const blocks = view["blocks"];

  const api_key = values["api-key"]["api-action"].value;
  is_number_validate(ticket_no, blocks) &&
    (await update_hint_word_for_txt_action(ticket_no, blocks, api_key));

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

app.action("add-ticket-btn", async ({ ack, body, context, client }) => {
  ack();
  const view = body["view"];
  const view_id = view["id"];
  const values = view.state.values;
  const ticket_no = values["ticket-no"]["add-ticket-txt"]["value"];

  for (let delete_target of delete_list) {
    delete view[delete_target];
  }
  const blocks = view["blocks"];

  const api_key = values["api-key"]["api-action"].value;
  // 『数値型』と『既に宣言してあるもの』のバリデーションを超えたら、
  // 正常通りのチケット更新用フォームを表示する。
  is_number_validate(ticket_no, blocks) &&
    is_already_exist(ticket_no, values, blocks) &&
    (await normal_adding_process(ticket_no, blocks, api_key));

  try {
    await client.views.update({
      token: context.botToken,
      view: view,
      view_id: view_id,
    });
    // console.log("update view successfully !");
  } catch (e) {
    console.error(e);
    console.error("view update error at btn action!");
  }
});

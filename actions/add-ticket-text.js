const { app } = require("../app");
// const { base_modal } = require("../views");

// 対応のチケットが存在しなかったら、操作を受け付けないで、
// "対象のチケットは見つかりませんでした" などの文言を返す。

app.action("add_ticket_txt", async ({ ack, body, context }) => {
  ack();
  console.log("action text received!!!");
  // const view = body["view"];
  // const priority = body["actions"][0]["value"];
  // const base_blocks = base_modal_view["blocks"];
  // let element_key = "";

  // // body['view']['blocks'] に、要素を追加する。
  // if (priority === "high") {
  //   element_key = "HIGH_LEVEL_ACTION_ELEMENT_COUNT";
  //   if (ELEMENT_COUNT[element_key] <= MAX_ELEMENT_COUNT) {
  //     addingElementToBlocks(base_blocks, priority, element_key);
  //   }
  // } else if (priority === "low") {
  //   element_key = "LOW_LEVEL_ACTION_ELEMENT_COUNT";
  //   if (ELEMENT_COUNT[element_key] <= MAX_ELEMENT_COUNT) {
  //     addingElementToBlocks(base_blocks, priority, element_key);
  //   }
  // } else {
  //   console.error(`Unexpected priority value ${value}`);
  // }

  // try {
  //   await app.client.views.update({
  //     token: context.botToken,
  //     view: base_modal_view,
  //     view_id: view["id"],
  //   });
  // } catch (err) {
  //   console.error(err);
  // }
});



app.action("add-ticket-btn", async ({ ack, body, context }) => {
  ack();
  console.log("action btn received!!!");
});



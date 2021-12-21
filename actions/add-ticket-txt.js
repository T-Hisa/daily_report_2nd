const axios = require("axios");
const { app } = require("../app");
const { base_modal } = require("../views");

const BASE_URL = process.env.REDMINE_URL;
// const { base_modal } = require("../views");

// 対応のチケットが存在しなかったら、操作を受け付けないで、
// "対象のチケットは見つかりませんでした" などの文言を返す。

app.action("add-ticket-txt", async ({ ack, payload, body, context }) => {
  ack();
  console.log("add-ticket-txt action arrived !!!!!");

  console.log(`body is ${body}`);
  console.log(`payload is ${payload}`);
  let issue_id = payload;
  let url = BASE_URL + `/issues/${issue_id}.json`;
  console.log("action text received!!!");
  try {
    let issue_response = await axios.get(url);
    let issue = issue_response["data"]["issue"];
    console.log("issue");
    console.log(issue);
  } catch {
    // 対象のチケットが見つからなかった場合、エラーに傾くのか確かめる
    console.error("axios error!");
    return;
  }

  try {
    await app.client.views.update({
      token: context.botToken,
      view: {},
      view_id: "id",
    });
  } catch {
    console.error("view update error!");
  }
});

app.action("add-ticket-btn", async ({ ack, payload, context }) => {
  ack();
  console.log("action btn received!!!");

  // チケットの内容更新フォームを作成する
  try {
    await app.client.views.update({
      token: context.botToken,
      view: {},
      view_id: "id",
    });
  } catch {
    console.error("view update error!");
  }
  // try {
  //   const result = await app.client.chat.postMessage({
  //     token: context.botToken,
  //     // Channel to send message to
  //     channel: payload.channel_id,
  //     // Include a button in the message (or whatever blocks you want!)
  //     blocks: [
  //       {
  //         type: "section",
  //         text: {
  //           type: "mrkdwn",
  //           text: "Go ahead. Click it.",
  //         },
  //         accessory: {
  //           type: "button",
  //           text: {
  //             type: "plain_text",
  //             text: "Click me!",
  //           },
  //           action_id: "button_abc",
  //         },
  //       },
  //     ],
  //     // Text in the notification
  //     text: "Message from Test App",
  //   });
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }
});

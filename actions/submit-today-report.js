const { app } = require("../app");

app.view(
  "submit-today-report",
  async ({ ack, body, view, context, payload }) => {
    ack();
    console.log("submit request arrived !!!!!!!!");
    console.log(`payload is ${payload}`);
    console.log("-----------" * 30);
    console.log(`body is ${body}`);
    console.log("-----------" * 30);
    console.log(`view is ${view}`);
    console.log("-----------" * 30);
    console.log(`context is ${context}`);
    console.log("-----------" * 30);
    try {
      app.client.chat.postMessage({
        token: context.botToken,
        channel: body.channel.id,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*[進行中]*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "• <https://sample.jp|バグ #40197 サポートフィーの算出の修正> *　3.5hours*\n\t\t○ コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*[終了]*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "• <https://sample.jp|バグ #40197 サポートフィーの算出の修正>  *3.5hours*\n\t\t○ 楽しかった",
            },
          },
        ],
      });
    } catch {
      console.error("postMessage Error !!!!!");
    }
  }
);

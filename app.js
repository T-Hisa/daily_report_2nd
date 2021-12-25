// Require the Bolt package (github.com/slackapi/bolt)
require('dotenv').config()
const { App } = require("@slack/bolt");

// for disposing as a single server
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

module.exports = { app };
require("./actions");
require("./commands");

const start_app = async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
};
start_app();

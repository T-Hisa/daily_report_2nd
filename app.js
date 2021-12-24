// Require the Bolt package (github.com/slackapi/bolt)
require('dotenv').config()
const { App, AwsLambdaReceiver } = require("@slack/bolt");

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

const handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};

module.exports = {
  app,
  handler,
}

require('./commands')
require('./actions')

// for disposing as a single server
// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
// });

// module.exports.app = app
// require('./actions')
// require('./commands')
// require('./views')

// const start_app = async () => {
//   await app.start(process.env.PORT || 3000);
//   console.log("⚡️ Bolt app is running!");
// };
// start_app();

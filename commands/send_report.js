const { app } = require("../app");
const { base_modal } = require("../views");

// Listen for a slash command invocation
app.command("/send_report", async ({ ack, payload, context }) => {
  ack();
  const channel_id = payload.channel_id
  try {
    result = await app.client.views.open({
      token: context.botToken,
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: payload.trigger_id,
      // View payload
      view: base_modal(channel_id),
    });
  } catch (error) {
    console.error('error');
  }
});

const { app } = require('../app')

app.action("time", async ({ ack }) => {
  ack()
})

app.action("comment", async ({ ack }) => {
  ack();
});

app.action("status", async ({ ack }) => {
  ack();
});
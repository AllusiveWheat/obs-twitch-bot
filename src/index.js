const tmi = require("tmi.js");
const OBSWebSocket = require("obs-websocket-js");
var obs = new OBSWebSocket();

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
  },

  channels: ["allusve"],
});
client.connect().catch((err) => {
  console.log(err);
});

client.on("chat", (channel, user, message, self) => {
  console.log(`${user["display-name"]}: ${message}`);
  if (user.mod) {
    // User is a mod.
    if (message.startsWith("!brb")) {
      setScene("BRB");
    }
  }
});

function setScene(scene) {
  obs
    .connect({
      address: process.env.OBS_WEBSOCKET_IP,
      password: process.env.OBS_WEBSOCKET_PASSWORD,
    })
    .then(() => {
      obs.send("SetCurrentScene", {
        "scene-name": scene,
      });
    })
    .then((data) => {
      console.log(`Set current scene to ${scene}`);
    })
    .then(() => {
      obs.on("error", (err) => {
        console.error("socket error:", err);
      });
    })
    .catch((err) => {
      console.error("Seting Sene Failed", err);
    });
}

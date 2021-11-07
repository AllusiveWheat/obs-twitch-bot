const OBSWebSocket = require("obs-websocket-js");
var obs = new OBSWebSocket();

function setScene(scene) {
  obs
    .connect({
      address: process.env.OBS_WEBSOCKET_IP,
      password: process.env.OBS_PASSWORD,
    })
    .then(() => {
      obs.send("SetCurrentScene", {
        "scene-name": scene,
      });
    })
    .then((data) => {
      console.log(`Set current scene to ${scene}`);
    })
    .catch((err) => {
      console.error("Seting Sene Failed", err);
    });
}
obs.on("error", (err) => {
  console.error("socket error:", err);
});
setScene("BRB");

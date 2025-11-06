const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.get("/game/PlaceLauncher.ashx", (req, res) => {
  const joinScriptUrl = `https://${req.headers.host}/Game/join.ashx`;
  const negotiateUrl =  `https://${req.headers.host}/Login/Negotiate.ashx`
  const responseText = `--rbxsig%FAKE
{"jobId":"Test","status":2,"joinScriptUrl":"${joinScriptUrl}","authenticationUrl":"${negotiateUrl}","message":"","ticket":""}`;
  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});
app.listen(PORT, () => {
  console.log(`ative`)
});

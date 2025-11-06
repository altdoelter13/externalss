const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// === /Game/PlaceLauncher.ashx ===
app.get("/Game/PlaceLauncher.ashx", (req, res) => {
  const host = req.headers.host;
  const placeid = req.query.placeid || "1";
  const joinScriptUrl = `https://${host}/Game/join.ashx?placeid=${placeid}`;
  const negotiateUrl =  `https://${host}/Login/Negotiate.ashx`;

  const responseText = `--rbxsig%FAKESIG
{"jobId":"${placeid}","status":2,"joinScriptUrl":"${joinScriptUrl}","authenticationUrl":"${negotiateUrl}","message":"","ticket":""}`;

  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});

// === /Game/join.ashx ===
app.get("/Game/join.ashx", (req, res) => {
  const sig = "--rbxsig%Bmtk0ZBtDZIR/kucTSJIKodsN8T59t6sIwUfK2TVImeNNX5nPE16O4oGmFVJOv40dUfAsd6GQdW4QUW9VCKHupwcXJRnzg8s+jUCdRhozOjTqriEp3lluZqX60YNLMdxKKgZeAYcd7qiFxSVPnhS/Htx3T9fy9B3Hg5FvFGluCc=%";
  const json = `{"ClientPort":0,"MachineAddress":"localhost","ServerPort":53640,"PingUrl":"","PingInterval":120,"UserName":"Player","SeleniumTestMode":false,"UserId":0,"SuperSafeChat":true,"PlaceId":0,"MeasurementUrl":"","WaitingForCharacterGuid":"e01c22e4-a428-45f8-ae40-5058b4a1dafc","BaseUrl":"http://www.roblox.com/","ChatStyle":"Classic","VendorId":0,"ScreenShotInfo":"","VideoInfo":"<?xml version=\\"1.0\\"?><entry xmlns=\\"http://www.w3.org/2005/Atom\\" xmlns:media=\\"http://search.yahoo.com/mrss/\\" xmlns:yt=\\"http://gdata.youtube.com/schemas/2007\\"><media:group><media:title type=\\"plain\\"><![CDATA[ROBLOX Place]]></media:title><media:description type=\\"plain\\"><![CDATA[ For more games visit http://www.roblox.com]]></media:description><media:category scheme=\\"http://gdata.youtube.com/schemas/2007/categories.cat\\">Games</media:category><media:keywords>ROBLOX, video, free game, online virtual world</media:keywords></media:group></entry>","CreatorId":0,"CreatorTypeEnum":"User","MembershipType":"None","AccountAge":0,"CookieStoreFirstTimePlayKey":"rbx_evt_ftp","CookieStoreFiveMinutePlayKey":"rbx_evt_fmp","CookieStoreEnabled":true,"IsRobloxPlace":false,"GenerateTeleportJoin":false,"IsUnknownOrUnder13":true,"SessionId":"","DataCenterId":0,"FollowUserId":0,"UniverseId":0}`;

  const responseText = `${sig}\n${json}`;

  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});

// === /Login/Negotiate.ashx ===
app.get("/Login/Negotiate.ashx", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("true");
});

// === Servir o thenormal.rbxl ===
app.get("/Game/thenormal.rbxl", (req, res) => {
  const filePath = path.join(__dirname, "thenormal.rbxl");
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/octet-stream");
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).send("thenormal.rbxl not found");
  }
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`Servidor Roblox Revival ativo na porta ${PORT}`);
});

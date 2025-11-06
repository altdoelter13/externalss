const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.get("/Game/PlaceLauncher.ashx", (req, res) => {
  const joinScriptUrl = `https://${req.headers.host}/Game/join.ashx`;
  const negotiateUrl =  `https://${req.headers.host}/Login/Negotiate.ashx`;
  const responseText = `{"jobId":"Test","status":2,"joinScriptUrl":"${joinScriptUrl}","authenticationUrl":"${negotiateUrl}","message":"","ticket":""}`;
  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});
app.get("/Game/join.ashx", (req, res) => {
  const responseText = `{"ClientPort":0,"MachineAddress":"localhost","ServerPort":53640,"PingUrl":"","PingInterval":120,"UserName":"Player","SeleniumTestMode":false,"UserId":0,"SuperSafeChat":true,"PlaceId":0,"MeasurementUrl":"","WaitingForCharacterGuid":"e01c22e4-a428-45f8-ae40-5058b4a1dafc","BaseUrl":"https://wackybloxx.neocities.org/","ChatStyle":"Classic","VendorId":0,"ScreenShotInfo":"","VideoInfo":"<?xml version=\"1.0\"?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:yt=\"http://gdata.youtube.com/schemas/2007\"><media:group><media:title type=\"plain\"><![CDATA[ROBLOX Place]]></media:title><media:description type=\"plain\"><![CDATA[ For more games visit http://www.roblox.com]]></media:description><media:category scheme=\"http://gdata.youtube.com/schemas/2007/categories.cat\">Games</media:category><media:keywords>ROBLOX, video, free game, online virtual world</media:keywords></media:group></entry>","CreatorId":0,"CreatorTypeEnum":"User","MembershipType":"None","AccountAge":0,"CookieStoreFirstTimePlayKey":"rbx_evt_ftp","CookieStoreFiveMinutePlayKey":"rbx_evt_fmp","CookieStoreEnabled":true,"IsRobloxPlace":false,"GenerateTeleportJoin":false,"IsUnknownOrUnder13":true,"SessionId":"","DataCenterId":0,"FollowUserId":0,"UniverseId":0}`;
  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});
app.get("/Login/Negotiate.ashx", (req, res) => {
  const responseText = `true`;
  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});
app.get("/games/start", (req, res) => {
  const responseText = ``;
  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});
app.listen(PORT, () => {
  console.log(`ative`);
});

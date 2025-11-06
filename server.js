const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/asset", (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing ?id parameter.");
  if (id === "1") {
    const filePath = path.join(__dirname, "thenormal.rbxl");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/octet-stream");
      return fs.createReadStream(filePath).pipe(res);
    } else {
      return res.status(404).send("thenormal.rbxl not found");
    }
  }
  const url = `https://assetdelivery.roblox.com/v1/asset/?id=${id}`;
  console.log(`[AssetDelivery] Proxying asset ID: ${id}`);
  https.get(url, (assetRes) => {
    if (assetRes.statusCode === 200) {
      res.setHeader("Content-Type", "application/octet-stream");
      assetRes.pipe(res);
    } else {
      res.status(assetRes.statusCode).send("Asset not found on Roblox.");
    }
  }).on("error", (err) => {
    console.error("Erro ao buscar asset:", err);
    res.status(500).send("Failed to fetch asset.");
  });
});

app.get("/asset/", (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing ?id parameter.");
  if (id === "1") {
    const filePath = path.join(__dirname, "thenormal.rbxl");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/octet-stream");
      return fs.createReadStream(filePath).pipe(res);
    } else {
      return res.status(404).send("thenormal.rbxl not found");
    }
  }
  const url = `https://assetdelivery.roblox.com/v1/asset/?id=${id}`;
  console.log(`[AssetDelivery] Proxying asset ID: ${id}`);
  https.get(url, (assetRes) => {
    if (assetRes.statusCode === 200) {
      res.setHeader("Content-Type", "application/octet-stream");
      assetRes.pipe(res);
    } else {
      res.status(assetRes.statusCode).send("Asset not found on Roblox.");
    }
  }).on("error", (err) => {
    console.error("Erro ao buscar asset:", err);
    res.status(500).send("Failed to fetch asset.");
  });
});

// === Página inicial (lista de jogos) ===
app.get("/games/list", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// === Página do jogo ===
app.get("/games/:id/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "game.html"));
});

// === /Game/PlaceLauncher.ashx ===
app.get("/Game/PlaceLauncher.ashx", (req, res) => {
  const host = req.headers.host;
  const placeid = req.query.placeid || "1";
  const joinScriptUrl = `https://${host}/Game/join.ashx?placeid=${placeid}`;
  const negotiateUrl = `https://${host}/Login/Negotiate.ashx`;

  const responseText = `--rbxsig%FAKESIG
{"jobId":"${placeid}","status":2,"joinScriptUrl":"${joinScriptUrl}","authenticationUrl":"${negotiateUrl}","message":"","ticket":""}`;

  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});

// === /Game/join.ashx ===
app.get("/Game/join.ashx", (req, res) => {
  const placeid = req.query.placeid || "1";
  const sig = "--rbxsig%Bmtk0ZBtDZIR/kucTSJIKodsN8T59t6sIwUfK2TVImeNNX5nPE16O4oGmFVJOv40dUfAsd6GQdW4QUW9VCKHupwcXJRnzg8s+jUCdRhozOjTqriEp3lluZqX60YNLMdxKKgZeAYcd7qiFxSVPnhS/Htx3T9fy9B3Hg5FvFGluCc=%";
  
  const json = {
    ClientPort: 0,
    MachineAddress: "localhost",
    ServerPort: 53640,
    PingUrl: "",
    PingInterval: 120,
    UserName: "Player",
    SeleniumTestMode: false,
    UserId: 0,
    SuperSafeChat: true,
    PlaceId: parseInt(placeid),
    MeasurementUrl: "",
    WaitingForCharacterGuid: "e01c22e4-a428-45f8-ae40-5058b4a1dafc",
    BaseUrl: "https://externalss.onrender.com/",
    ChatStyle: "Classic",
    VendorId: 0,
    ScreenShotInfo: "",
    VideoInfo: "<?xml version=\"1.0\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"><media:group><media:title><![CDATA[ROBLOX Place]]></media:title></media:group></entry>",
    CreatorId: 0,
    CreatorTypeEnum: "User",
    MembershipType: "None",
    AccountAge: 0,
    CookieStoreEnabled: true,
    IsRobloxPlace: false,
    GenerateTeleportJoin: false,
    IsUnknownOrUnder13: true
  };

  const responseText = `${sig}\n${JSON.stringify(json)}`;
  res.setHeader("Content-Type", "text/plain");
  res.send(responseText);
});

// === /Login/Negotiate.ashx ===
app.get("/Login/Negotiate.ashx", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("true");
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`Servidor Roblox Revival ativo em http://localhost:${PORT}`);
});

const express = require("express");
const fetch = require("node-fetch");
const app = express();

const API_KEY = "ВСТАВЬ_СЮДА_API_KEY";
const NICKNAME = "alcanttare";

app.get("/faceit", async (req, res) => {
  try {
    const playerRes = await fetch(`https://open.faceit.com/data/v4/players?nickname=${NICKNAME}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    const playerData = await playerRes.json();
    const playerId = playerData.player_id;

    const statsRes = await fetch(`https://open.faceit.com/data/v4/players/${playerId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    const stats = await statsRes.json();
    const elo = stats.games.cs2.faceit_elo;
    const level = stats.games.cs2.skill_level;

    res.send(`ELO: ${elo} (lvl ${level})`);
  } catch (e) {
    res.send("Не удалось получить ELO 😢");
  }
});

app.listen(3000, () => console.log("Server started"));
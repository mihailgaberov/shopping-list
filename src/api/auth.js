const express = require("express");
const { authorize } = require("@liveblocks/node");

const API_KEY = import.meta.env.VITE_API_KEY;
const app = express();

app.use(express.json());

app.post("/api/auth", (req, res) => {
  
  if (!API_KEY) {
    return res.status(403).end();
  }

  const response = await authorize({
    room: req.body.room,
    secret: API_KEY,
    userInfo: {
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      picture: `/avatars/${Math.floor(Math.random() * 10)}.png`,
    },
  });

  return res.status(response.status).end(response.body);
});
import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/reel", (req, res) => {
  const url = req.body.url;

  if (!url || !url.includes("instagram.com")) {
    return res.json({ error: "Invalid Instagram URL" });
  }

  exec(`yt-dlp -f mp4 -g "${url}"`, (error, stdout) => {
    if (error) {
      return res.json({ error: "Failed to fetch video" });
    }

    res.json({
      success: true,
      video: stdout.trim()
    });
  });
});

app.get("/", (req, res) => {
  res.send("IG Reel Downloader API Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

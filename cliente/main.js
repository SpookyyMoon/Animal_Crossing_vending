import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

import { startServer } from "../server/src/servidor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("cliente/renderer/index.html");
}

app.whenReady().then(async () => {
  await startServer();
  createWindow();
});

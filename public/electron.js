import { BrowserWindow, app } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
// const { BrowserWindow, app } = require("electron");
// const path = require("path");
// const isDev = require("electron-is-dev");

const BASE_URL = "http://localhost:3000";
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 900,
    resizable: true,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.loadURL(BASE_URL);
    win.webContents.openDevTools({ mode: "detach" });
  }
  win.setResizable(true);
  win.on("closed", () => (win = null));
  win.focus();
};

app.whenReady().then(() => {
  createWindow();

  // Linux와 Winodws 앱은 browser window가 열려 있지 않을 때 종료됩니다.
  // macOS는 browser window가 열려 있지 않아도 계속 실행되기 때문에,
  // browser window가 열려 있지 않을 때 앱을 활성화 하면 새로운 browser window를 열어줍니다.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Linux와 Winodws에서는 모든 창을 종료하면 일반적으로 앱이 완전히 종료됩니다.
  // macOS(darwin)가 아닌 경우, 'window-all-closed' 이벤트가 발생했을 때, 앱을 종료합니다.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

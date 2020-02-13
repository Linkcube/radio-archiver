const { app, BrowserWindow } = require('electron');
const { execFile } = require('child_process');
const kill = require('tree-kill');
const sra = require.resolve('svelte-radio-interface');
const nora_path = require.resolve('linkcube-nora');
const path = require('path');
const winston = require('winston');

const noraLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});


// Start the backend nora process before loading the webpage
if (process.platform == 'win32') {
  var cmd = 'npx.cmd'
} else {
  var cmd = 'npx'
}

const nora = execFile('node', [path.join(path.dirname(nora_path), 'cli_start.js'), '-d', '-a', '-s']);
nora.stdout.on('data', (data) => noraLogger.info(data));
nora.stderr.on('data', (data) => noraLogger.error(data));



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 960,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    ready: false
  });

  setTimeout(() => win.ready = true, 5000);

  // and load the index.html of the app.
  win.loadFile(sra);

  // hide the menu
  win.removeMenu();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  setTimeout(createWindow, 1000);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    console.log('Exiting');
    kill(nora.pid);
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

var fs = require("fs");
const message = require("./output").message;
const createMainJsFiles = require("./createFiels").createMainJsFiles;

const createMainFolders = () => {
  let srcDir = "./src";
  let storeDir = "./src/store";

  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }
  if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir);
  }
};

const createReduxFolder = (name) => {
  let dir = `./src/store/${name}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  createMainJsFiles(name);
  message("CRUD files created successfully");
};
module.exports = {
  createMainFolders,
  createReduxFolder,
};

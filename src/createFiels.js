const fs = require("fs");
const createMainJsFiles = (folder) => {
  let dir = `./src/store/${folder}`;
  fs.writeFile(`${dir}/action.js`, "", function (err) {
    if (err) throw err;
  });
  fs.writeFile(`${dir}/actionTypes.js`, "", function (err) {
    if (err) throw err;
  });
  fs.writeFile(`${dir}/reducer.js`, "", function (err) {
    if (err) throw err;
  });
  fs.writeFile(`${dir}/saga.js`, "", function (err) {
    if (err) throw err;
  });
};
module.exports = {
  createMainJsFiles,
};

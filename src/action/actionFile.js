const stringOptions = require("../nameOptions");
const message = require("../output").message;
const actionTypes = require("../actionType/actionTypeFile").result;
let fs = require("fs");
const prettier = require("prettier");
let result = [];
const generate = (name, arr) => {
  arr.forEach((el) => {
    if (el.ans) {
      let pref = el.type;
      let suf = stringOptions.toUpperFirst(el.suffex);
      let Name = stringOptions.toUpperFirst(name);
      if (el.single) Name = stringOptions.withOutLastChar(Name);
      result.push(`${pref}${Name}${suf}`);
      if (!el.pagination) {
        result.push(`${pref}${Name}${suf}Success`);
        result.push(`${pref}${Name}${suf}Error`);
      }
    }
  });
  let dir = `./src/store/${name}/action.js`;
  writeContent(dir);
};

const writeContent = (dir) => {
  try {
    let content = "import { \n";
    for (let i = 0; i < actionTypes.length; i++)
      content += " " + actionTypes[i] + "," + "\n";
    content +=
      "CHANGE_LIMIT,CHANGE_SKIP,CHANGE_PAGE} from './actionTypes.js'\n";
    content = prettier.format(content, { semi: false, parser: "babel" });
    fs.appendFileSync(dir, content);
    content = "";
    for (i = 0; i < result.length; i++) {
      content += `
export const ${result[i]} = (payload) => {
  return {
    type: ${actionTypes[i]},
    payload: payload,
  };
};
 `;
    }
    content +=
      "export const changeLimit=(limit)=>{return {type:CHANGE_LIMIT,payload:limit}}\n\n";
    content +=
      "export const changeSkip=(skip)=>{return {type:CHANGE_SKIP,payload:skip}}\n\n";
    content +=
      "export const changePage=(page)=>{return {type:CHANGE_PAGE,payload:page}}\n\n";
    content = prettier.format(content, { semi: false, parser: "babel" });
    fs.appendFileSync(dir, content);
    message("action file content generated successfuly");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generate };

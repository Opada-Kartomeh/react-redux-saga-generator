const stringOptions = require("../nameOptions");
const message = require("../output").message;
let fs = require("fs");
const prettier = require("prettier");
let result = [];
let types = [];
let functionsNames = [];
const generate = (name, arr) => {
  arr.forEach((el) => {
    if (el.ans) {
      let pref = el.type;
      let suf = stringOptions.toUpperFirst(el.suffex);
      let Name = stringOptions.toUpperFirst(name);
      if (el.single) Name = stringOptions.withOutLastChar(Name);
      types.push(
        `${stringOptions.toUpper(pref)}_${stringOptions.toUpper(Name)}${
          suf ? "_" : ""
        }${stringOptions.toUpper(suf)}`
      );
      functionsNames.push({ name: `${pref}${Name}${suf}`, ...el });
      if (!el.pagination) {
        result.push(`${pref}${Name}${suf}Success`);
        result.push(`${pref}${Name}${suf}Error`);
      }
    }
  });

  let dir = `./src/store/${name}/saga.js`;
  writeContent(dir, name);
};

const writeContent = (dir, name) => {
  try {
    let content = "";
    content += 'import { call, put, takeEvery } from "redux-saga/effects"\n';
    content += 'import axios from "axios"\n';
    content += "import {";
    for (let i = 0; i < result.length; i++) content += `${result[i]},`;
    content += "} from './action'\n";
    content += "import {";
    for (let i = 0; i < types.length; i++) content += `${types[i]},`;
    content += "} from './actionTypes'\n\n";
    let resIdx = 0;
    for (let i = 0; i < functionsNames.length; i++) {
      content += `const ${functionsNames[i].name}Async = async(data)=>{
          try{
             const response= await axios.${
               functionsNames[i].method
             }${getAxiosBody(functionsNames[i])};
             return response;
          }catch(error)
          {
              return error;
          }
      }\n\n`;
      content += `function* ${functionsNames[i].name} (action){
          let response=yield call(${
            functionsNames[i].name
          }Async,action.payload);
          if(response.status==200||response.status==201)
          {
            yield put(${result[resIdx]}(response.data))
          }
          else
          {
            yield put(${result[resIdx + 1]}(response.error.message))
          }
      }\n\n\n`;
      resIdx += 2;
    }

    content += `function* ${name}Saga() {
        
      `;
    for (let i = 0; i < types.length; i++) {
      content += `
        yield takeEvery(${types[i]},${functionsNames[i].name})
      `;
    }

    content += `}
     export default ${name}Saga`;
    content = prettier.format(content, { semi: false, parser: "babel" });
    fs.appendFileSync(dir, content);
    message("saga file content generated successfuly");
  } catch (err) {
    console.log(err);
  }
};

const getAxiosBody = (el) => {
  if (el.method == "get" && !el.suffex)
    return (
      "(`" + `${el.endpoint}?` + "limit=${data.limit}&skip=${data.skip}" + "`)"
    );
  if (el.method == "get") return "(`" + `${el.endpoint}` + "${data.id}" + "`)";
  if (el.method == "post") return "(`" + `${el.endpoint}` + "`,{...data})";
  if (el.method == "put")
    return "(`" + `${el.endpoint}` + "${data.id}" + "`,{...data})";

  if (el.method == "delete")
    return "(`" + `${el.endpoint}` + "${data.id}" + "`)";
};
module.exports = { generate, result };

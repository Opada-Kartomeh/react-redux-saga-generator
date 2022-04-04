const stringOptions = require("../nameOptions");
const message = require("../output").message;
const actionTypes = require("../actionType/actionTypeFile").result;
const prettier = require("prettier");
let fs = require("fs");
let result = [];
const generate = (name, arr) => {
  let dir = `./src/store/${name}/reducer.js`;
  writeContent(dir, name);
};

const writeContent = (dir, name) => {
  try {
    let content = "import { \n";
    for (let i = 0; i < actionTypes.length; i++)
      content += " " + actionTypes[i] + "," + "\n";
    content += "} from './actionTypes.js'\n\n";
    content += `const initialState = {
      ${name}: {requestStatus: "loading",error: "",limit: 5,skip: 0,page: 0,}, ${name}Details:{requestStatus:"loading",error:""}}\n`;

    let cases = `switch(action.type){`;
    for (let i = 0; i < actionTypes.length; i++) {
      cases += `case ${actionTypes[i]} :            
             state={...state,${getState(actionTypes[i], name)}}
             break;
`;
    }
    cases += `case CHANGE_LIMIT:
        state={...state,${name}:{...state.${name},limit:action.payload}}\n break;\n `;
    cases += `case CHANGE_SKIP:
        state={...state,${name}:{...state.${name},skip:action.payload}}\n break;\n `;
    cases += `case CHANGE_PAGE:
        state={...state,${name}:{...state.${name},page:action.payload}}\n break; \n`;
    cases += "}";
    content += `
 const ${name}Reducer = (state = initialState, action )=>{

    
         ${cases}
     
    return state;
 }



 export default ${name}Reducer;
`;
    content = prettier.format(content, { semi: false, parser: "babel" });
    fs.appendFileSync(dir, content);
    message("reducer file content generated successfuly");
  } catch (err) {
    console.log(err);
  }
};

const getState = (actionType, name) => {
  let temp = actionType.split("_");
  if (temp[0] == "GET" && temp[2] !== "DETAILS") {
    if (temp.length == 3) {
      if (temp[2] == "SUCCESS")
        return `${name}:{...state.${name},requestStatus:"success",data:action.payload}`;
      else
        return `${name}:{...state.${name},requestStatus:"faield",error:action.payload}`;
    } else return `${name}:{...state.${name},requestStatus:"loading"}`;
  } else if (temp[0] == "GET" && temp[2] == "DETAILS") {
    if (temp[3] == "SUCCESS") {
      return `${name}Details:{...state.${name}Details,requestStatus:"success",data:action.payload}`;
    } else if (temp[3] == "ERROR") {
      return `${name}Details:{...state.${name}Details,requestStatus:"faield",error:action.payload}`;
    } else {
      return `${name}Details:{...state.${name}Details,requestStatus:"loading"}`;
    }
  } else if (temp[0] == "ADD") {
    if (temp[2] == "SUCCESS") {
      return `${name}:{...state.${name},loader:false,data:[...state.${name}.data,action.payload]}`;
    } else if (temp[2] == "ERROR") {
      return `${name}:{...state.${name},loader:false,error:action.payload}`;
    } else return `${name}:{...state.${name},loader:true}`;
  } else if (temp[0] == "UPDATE") {
    if (temp[2] == "SUCCESS") {
      return `${name}:{...state.${name},loader:false,updatedElement:action.payload}`;
    } else if (temp[2] == "ERROR") {
      return `${name}:{...state.${name},loader:false,error:action.payload}`;
    } else return `${name}:{...state.${name},loader:true}`;
  } else if (temp[0] == "DELETE") {
    if (temp[2] == "SUCCESS") {
      return `${name}:{...state.${name},loader:false,deletedElement:action.payload}`;
    } else if (temp[2] == "ERROR") {
      return `${name}:{...state.${name},loader:false,error:action.payload}`;
    } else return `${name}:{...state.${name},loader:true}`;
  }
  return "";
};

module.exports = {
  generate,
};

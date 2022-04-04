#! /usr/bin/env node
let cin = require("./src/input").cin;

let scriptOutput = require("./src/output");

const folders = require("./src/createFolder");

const questions = require("./src/questions");

const actionsTypes = require("./src/actionType/actionTypeFile");

const action = require("./src/action/actionFile");

const reducer = require("./src/reducer/reducerFile");

const saga = require("./src/saga/sagaFile");
scriptOutput.startScript();

folders.createMainFolders();

let crud = cin("ENTER CRUD NAME");

folders.createReduxFolder(crud);

questions.createQuestions(crud);

actionsTypes.generate(crud, questions.questions);

action.generate(crud, questions.questions);

reducer.generate(crud, questions.questions);

saga.generate(crud, questions.questions);

//scriptOutput.endScript();

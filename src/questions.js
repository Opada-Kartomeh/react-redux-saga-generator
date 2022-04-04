let questions = [
  {
    question: "press 1 if you want code generate for get $",
    suffex: "",
    type: "get",
    method: "get",
    ans: 0,
  },
  {
    question: "press 1 if you want code generate for get % details",
    suffex: "details",
    type: "get",
    single: true,
    method: "get",
    ans: 0,
  },
  {
    question: "press 1 if you want code generate for add %",
    suffex: "",
    type: "add",
    single: true,
    method: "post",
    ans: 0,
  },
  {
    question: "press 1 if you want code generate for update %",
    suffex: "",
    type: "update",
    single: true,
    method: "put",
    ans: 0,
  },
  {
    question: "press 1 if you want code generate for delete %",
    suffex: "",
    type: "delete",
    single: true,
    method: "delete",
    ans: 0,
  },
];
let cin = require("./input").cin;
let nameOptions = require("./nameOptions");

let createQuestions = (name) => {
  let signal = nameOptions.withOutLastChar(name);
  for (let i = 0; i < questions.length; i++) {
    let question = questions[i].question;
    question = question.replace("$", name);
    question = question.replace("%", signal);
    let ans = cin(question, "blue");
    if (ans == 1) {
      ans = cin("please enter endpoint", "cyan");
      questions[i].endpoint = ans;
      questions[i].ans = 1;
    }
  }
};

module.exports = {
  createQuestions,
  questions,
};

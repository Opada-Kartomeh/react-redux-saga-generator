var prompt = require("prompt-sync")();
const Chalk = require("chalk");
const cin = (title, color = "blue") => {
  let input = prompt(Chalk[color](`${title} : `));
  return input;
};

module.exports = {
  cin,
};

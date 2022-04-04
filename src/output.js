const chalk = require("chalk");
const startScript = () => {
  console.log(
    chalk.green(
      "",
      "",
      "",
      "-----------------------------------------Redux-saga-generator---------------------------"
    )
  );
};
const endScript = () => {
  for (let i = 0; i < 10; i++) console.log("");
  console.log(chalk.green("Thank you for use Redux-saga-generator"));
};
const message = (msg, color = "green") => {
  console.log(chalk[color](`${msg} ✓`));
};
const inputMessage = (msg, color = "green") => {
  console.log(chalk[color](`${msg} :`));
};
module.exports = {
  startScript,
  endScript,
  message,
  inputMessage,
};

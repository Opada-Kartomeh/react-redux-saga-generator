const toUpper = (name) => {
  return name.toUpperCase();
};
const toUpperFirst = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
const withOutLastChar = (name) => {
  return name.slice(0, -1);
};

module.exports = {
  toUpper,
  toUpperFirst,
  withOutLastChar,
};

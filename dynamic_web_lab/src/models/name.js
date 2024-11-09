const names = [];

const addName = (name) => {
  names.push(name);
};

const getNames = () => {
  return names;
};

module.exports = { addName, getNames };

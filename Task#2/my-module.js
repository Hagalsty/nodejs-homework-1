const fs = require("fs");

// For tests
// let rawData = fs.readFileSync("./tasks.json", () => {});
// let innerTextOfMyModule = JSON.parse(rawData);
// console.log(innerTextOfMyModule);

const addData = (data, id) => {
  let rawDataInAdd = fs.readFileSync("./tasks.json", (err) => {
    if (err) console.log("ERROR: In Add ", err);
  });
  let innerTextOfFile = JSON.parse(rawDataInAdd);
  innerTextOfFile.push({
    id,
    ...data,
  });
  let dataToWrite = JSON.stringify(innerTextOfFile);
  fs.writeFileSync("./tasks.json", dataToWrite);
};

const getData = (id) => {
  let rawDataInGet = fs.readFileSync("./tasks.json", (err) => {
    if (err) console.log("ERROR: In Get ", err);
  });
  let innerTextOfFile = JSON.parse(rawDataInGet);
  const res = innerTextOfFile.filter((el) => id === el.id);
  console.log("res", res);

  return res;
};

const removeData = (id) => {
  let rawDataInRemove = fs.readFileSync("./tasks.json", (err) => {
    if (err) console.log("ERROR: In Remove", err);
  });
  let innerTextOfFile = JSON.parse(rawDataInRemove);
  const res = innerTextOfFile.filter((el) => el.id !== id);
  let dataToWrite = JSON.stringify(res);
  fs.writeFileSync("./tasks.json", dataToWrite);
};

// For tests
// addData({ title: "lord of the rings", status: "toRead" }, 5);
// getData(2);
// removeData(4);
// rawData = fs.readFileSync("./tasks.json", () => {});
// innerTextOfMyModule = JSON.parse(rawData);
// console.log(innerTextOfMyModule);

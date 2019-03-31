const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");

module.exports = () =>
  new Promise((resolve, reject) => {
    fs.readFile(inputPath, (err: Error, data: string) => {
      if (err) reject(err);

      resolve(data);
    });
  });

#!/usr/bin/env node

const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const config = require("./config");

if (process.argv.length < 3) {
  return;
}

const filePaths = process.argv.slice(2);
const resultUrls = [];
const uploadToQiniu = (filePath) => {
  const fileName = path.basename(filePath);
  const dirName = path.basename(path.dirname(filePath));
  const command = `${config.qshellPath} fput ${config.qiniuBucket} ${config.qiniuPath}/${dirName}/${fileName} ${filePath}`;
  try {
    result = execSync(command);
  } catch (e) {}

  const uploadSuccess = result.toString().match(/Put file .* success!/gi);
  if (uploadSuccess && uploadSuccess.length) {
    resultUrls.push(`${config.host}/${config.qiniuPath}/${dirName}/${fileName}`);
  }
};

filePaths.forEach(uploadToQiniu);

console.log("Upload Success:");
console.log(resultUrls.join(os.EOL));

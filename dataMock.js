const   fs = require("fs"),
        path = require("path"),
        util = require('util');

const saveFile = util.promisify(fs.writeFile)

const mockFoler = "mock";

const getFileList = () =>fs.readdirSync(`./${mockFoler}/`)

const getFile = (filename) => fs.readFileSync(path.join(`./${mockFoler}/`, filename), "utf8");

const setFile = (content, filename) => saveFile(path.join(`./${mockFoler}/`, filename), content)

module.exports = {getFileList, getFile, setFile}
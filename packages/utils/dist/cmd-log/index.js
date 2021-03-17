"use strict";
exports.__esModule = true;
exports.log = exports.changeLogLevel = void 0;
var log = require("npmlog");
exports.log = log;
// 自定义log样式
// log.heading = "dd-cli";
// log.headingStyle = { fg: "red", bg: "white" };
// log.addLevel("sucess", 2000, { fg: "yellow" });
function changeLogLevel(level) {
    log.level = level;
}
exports.changeLogLevel = changeLogLevel;

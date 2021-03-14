#! /usr/bin/env node
const { CLI, checkUpdate } = require("../dist");
const minimist = require("minimist");
const argv = minimist(process.argv.slice(2));
// 启动CLI前 检查当前运行环境
checkUpdate();
const cli = new CLI(argv);

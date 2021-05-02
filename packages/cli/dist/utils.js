"use strict";
exports.__esModule = true;
exports.checkUpdate = void 0;
var path_1 = require("path");
var os_1 = require("os");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var semver = require("semver");
function checkUpdate() {
    var startTime = Date.now();
    var lockFile = path_1.join(os_1.tmpdir(), 'ddupupdate.lock');
    if (fs_1.existsSync(lockFile)) {
        // 每天只检查一边更新ss
        var content = +fs_1.readFileSync(lockFile).toString();
        if (startTime - content < 24 * 3600000) {
            return;
        }
    }
    fs_1.writeFileSync(lockFile, "" + startTime);
    try {
        var data = child_process_1.execSync("npm view @dd-up/cli dist-tags --json", {
            cwd: process.env.HOME
        }).toString();
        var remoteLatestVersion = JSON.parse(data)['latest'];
        var localVersion = require('../package.json').version;
        if (semver.gt(remoteLatestVersion, localVersion)) {
            console.log();
            console.log('*********************************************************');
            console.log();
            console.log('   发现新版本:');
            console.log("   " + localVersion + " ==> " + remoteLatestVersion);
            console.log('   安装:');
            console.log('   npm i @dd-up/cli -g');
            console.log();
            console.log('*********************************************************');
            console.log();
        }
    }
    catch (err) {
        console.log('版本检查失败', err);
    }
}
exports.checkUpdate = checkUpdate;

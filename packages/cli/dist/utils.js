"use strict";
exports.__esModule = true;
exports.checkUpdate = void 0;
var child_process_1 = require("child_process");
var semver = require("semver");
function checkUpdate() {
    // const startTime = Date.now();
    // const lockFile = join(tmpdir(), 'ddupupdate.lock');
    // if (existsSync(lockFile)) {
    //   // 每天只检查一边更新ss
    //   const content = +readFileSync(lockFile).toString();
    //   if (startTime - content < 24 * 3600000) {
    //     return;
    //   }
    // }
    // writeFileSync(lockFile, `${startTime}`);
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

"use strict";
exports.__esModule = true;
exports.checkUpdate = void 0;
var path_1 = require("path");
var os_1 = require("os");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
function checkUpdate() {
    var startTime = Date.now();
    var lockFile = path_1.join(os_1.tmpdir(), "ddupupdate.lock");
    if (fs_1.existsSync(lockFile)) {
        var content = +fs_1.readFileSync(lockFile).toString();
        if (startTime - content < 24 * 3600000) {
            // return;
        }
    }
    fs_1.writeFileSync(lockFile, "" + startTime);
    try {
        var data = child_process_1.execSync("npm view @ddup/cli dist-tags --json", {
            cwd: process.env.HOME
        }).toString();
        console.log(JSON.parse(data)["latest"]);
    }
    catch (err) {
        console.log("更新失败", err);
    }
}
exports.checkUpdate = checkUpdate;

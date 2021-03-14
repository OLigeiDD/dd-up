import { join } from "path";
import { tmpdir, platform } from "os";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

export function checkUpdate() {
  const startTime = Date.now();
  const lockFile = join(tmpdir(), "ddupupdate.lock");
  if (existsSync(lockFile)) {
    const content = +readFileSync(lockFile).toString();
    if (startTime - content < 24 * 3600000) {
      // return;
    }
  }
  writeFileSync(lockFile, `${startTime}`);
  try {
    const data = execSync(`npm view @ddup/cli dist-tags --json`, {
      cwd: process.env.HOME,
    }).toString();
    console.log(JSON.parse(data)["latest"]);
  } catch (err) {
    console.log("更新失败", err);
  }
}

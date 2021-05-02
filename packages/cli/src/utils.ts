import { join } from 'path';
import { tmpdir, platform } from 'os';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import * as semver from 'semver';

export function checkUpdate() {
  const startTime = Date.now();
  const lockFile = join(tmpdir(), 'ddupupdate.lock');
  if (existsSync(lockFile)) {
    // 每天只检查一边更新ss
    const content = +readFileSync(lockFile).toString();
    if (startTime - content < 24 * 3600000) {
      return;
    }
  }
  writeFileSync(lockFile, `${startTime}`);
  try {
    const data = execSync(`npm view @dd-up/cli dist-tags --json`, {
      cwd: process.env.HOME,
    }).toString();
    const remoteLatestVersion = JSON.parse(data)['latest'];
    const localVersion = require('../package.json').version;
    if (semver.gt(remoteLatestVersion, localVersion)) {
      console.log();
      console.log('*********************************************************');
      console.log();
      console.log('   发现新版本:');
      console.log(`   ${localVersion} ==> ${remoteLatestVersion}`);
      console.log('   安装:');
      console.log('   npm i @dd-up/cli -g');
      console.log();
      console.log('*********************************************************');
      console.log();
    }
  } catch (err) {
    console.log('版本检查失败', err);
  }
}

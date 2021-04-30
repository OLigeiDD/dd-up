#! /usr/bin/env node

const { CLI, checkUpdate } = require('../dist');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
console.log(argv);
// 启动CLI前 检查更新
checkUpdate();
const cli = new CLI();

cli
  .start()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.log('\n\n\n');
    console.log(
      'Error! You can try adding the -V parameter for more information output.',
      '错误！,你可以添加 -V 参数查看更多信息'
    );
    console.log('\n\n\n');
    console.error(e);
    process.exitCode = 1;
    process.exit(1);
  });

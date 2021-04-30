import { program, Command } from 'commander';
import { commanderList, CammanderOption } from './commands';
import { changeLogLevel, log } from '@dd-up/utils';
export * from './utils';

export class CLI {
  core: any;
  commands: CammanderOption[];
  argv: any;
  cwd = process.cwd();
  debug = log.verbose;

  constructor() {
    this.commands = commanderList;
  }

  async registerCommander() {
    const pkg = require('../package.json');
    const argv = process.argv;
    program
      .name('d')
      .usage('<command> [options]')
      .version(pkg.version, '-v, --version', '查看当前版本')
      .option('-d, --debug', '是否开启调试', false);

    this.commands.forEach((cmd) => {
      const pg = program.command(
        `${cmd.command} ${cmd.argv ? `[${cmd.argv}]` : ''}`
      );
      cmd.options.forEach((opt) => {
        pg.option(`-${opt.alias},--${opt.name}`, opt.des);
      });
      pg.description(cmd.description);
      pg.action(require(cmd.actionModule).default);
    });

    program.on('option:debug', () => {
      changeLogLevel('verbose');
      this.debug('', 'debug');
    });
    program.on('command:*', function (cmd) {
      log.error('', `未知的命令 ${cmd}`);
    });
    // program
    //   .command("init [name]")
    //   .description("初始化项目")
    //   .option("-f, --force", "如果已存在项目，则强制清空")
    //   .action((name, options) => {
    //     console.log(name, options);
    //   });
    // 第一种
    // const clone = program.command("clone <source> [dest]");
    // clone
    //   .description("clone 命令")
    //   .option("-f, --force", "是否强制拷贝", false)
    //   .action((source, dest, option) => {
    //     console.log("do clone", source, dest, option);
    //   });
    // 第二种
    // const service = new Command("service");
    // service.command("start");
    // service.command("stop");
    // program.addCommand(service);

    // 执行其他脚手架命令
    // program
    //   .command("add [name]", "install plugin", {
    //     executableFile: "d",
    //   })
    //   .alias("a");
    // 兜底
    // program
    //   .arguments("<cmd> [argument]")
    //   .description("击鼓", {
    //     cmd: "命令",
    //     argument: "命令参数",
    //   })
    //   .action((cmd, argument, options) => {
    //     console.log(cmd, argument, options);
    //   });
    program.parse(argv);

    if (program.args && program.args.length < 1) {
      program.outputHelp();
    }
  }

  async addCommander() {}

  async start() {
    await this.registerCommander();
  }
}

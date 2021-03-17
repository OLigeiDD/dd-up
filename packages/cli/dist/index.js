"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CLI = void 0;
var commander_1 = require("commander");
var commands_1 = require("./commands");
var utils_1 = require("@dd-up/utils");
__exportStar(require("./utils"), exports);
var CLI = /** @class */ (function () {
    function CLI() {
        this.cwd = process.cwd();
        this.debug = utils_1.log.verbose;
        this.commands = commands_1.commanderList;
    }
    CLI.prototype.registerCommander = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pkg, argv;
            var _this = this;
            return __generator(this, function (_a) {
                pkg = require('../package.json');
                argv = process.argv;
                commander_1.program
                    .name('d')
                    .usage('<command> [options]')
                    .version(pkg.version, '-v, --version', '查看当前版本')
                    .option('-d, --debug', '是否开启调试', false);
                this.commands.forEach(function (cmd) {
                    var pg = commander_1.program.command(cmd.command + " " + (cmd.argv ? "[" + cmd.argv + "]" : ''));
                    cmd.options.forEach(function (opt) {
                        pg.option("-" + opt.alias + ",--" + opt.name, opt.des);
                    });
                    pg.description(cmd.description);
                    pg.action(require(cmd.actionModule)["default"]);
                });
                commander_1.program.on('option:debug', function () {
                    utils_1.changeLogLevel('verbose');
                    _this.debug('', 'debug');
                });
                commander_1.program.on('command:*', function (cmd) {
                    utils_1.log.error('', "\u672A\u77E5\u7684\u547D\u4EE4 " + cmd);
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
                commander_1.program.parse(argv);
                if (commander_1.program.args && commander_1.program.args.length < 1) {
                    commander_1.program.outputHelp();
                }
                return [2 /*return*/];
            });
        });
    };
    CLI.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerCommander()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CLI;
}());
exports.CLI = CLI;

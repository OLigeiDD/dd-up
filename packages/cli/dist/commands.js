"use strict";
exports.__esModule = true;
exports.commanderList = void 0;
exports.commanderList = [
    {
        command: "init",
        description: "项目初始化",
        argv: "name",
        options: [
            {
                alias: "f",
                name: "force",
                des: "如果已存在项目，则强制清空"
            },
        ],
        actionModule: "@dd-up/cli-cmd-init"
    },
];

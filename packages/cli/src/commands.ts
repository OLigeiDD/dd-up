export interface CammanderOption {
  command: string;
  argv?: string;
  description?: string;
  options?: Array<{
    alias: string;
    name: string;
    des?: string;
  }>;
  actionModule: string;
}

export const commanderList: CammanderOption[] = [
  {
    command: "init",
    description: "项目初始化",
    argv: "name",
    options: [
      {
        alias: "f",
        name: "force",
        des: "如果已存在项目，则强制清空",
      },
    ],
    actionModule: "@dd-up/cli-cmd-init",
  },
];

import { CammanderOption } from "./commands";
export * from "./utils";
export declare class CLI {
    core: any;
    commands: CammanderOption[];
    argv: any;
    cwd: string;
    constructor();
    registerCommander(): Promise<void>;
    start(): Promise<void>;
}

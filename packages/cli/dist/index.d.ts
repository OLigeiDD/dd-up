import { CammanderOption } from './commands';
export * from './utils';
export declare class CLI {
    core: any;
    commands: CammanderOption[];
    argv: any;
    cwd: string;
    debug: (prefix: string, message: string, ...args: any[]) => void;
    constructor();
    registerCommander(): Promise<void>;
    addCommander(): Promise<void>;
    start(): Promise<void>;
}

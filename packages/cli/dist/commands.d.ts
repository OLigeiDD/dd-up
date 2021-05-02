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
export declare const commanderList: CammanderOption[];

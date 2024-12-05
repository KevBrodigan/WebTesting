export default class SwrveLogger {
    static readonly DEBUG: number;
    static readonly INFO: number;
    static readonly WARN: number;
    static readonly ERROR: number;
    static readonly NONE: number;
    static error(message: string, ...args: any[]): void;
    static warn(message: string, ...args: any[]): void;
    static info(message: string, ...args: any[]): void;
    static debug(message: string, ...args: any[]): void;
    static level(level?: number): number;
}

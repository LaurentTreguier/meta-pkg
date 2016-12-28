import Package from './package';
import Backend from './backend';
export { Package };
export declare type PackageInfo = string | Package;
export declare function isInstalled(packageInfo: PackageInfo): PromiseLike<boolean>;
export declare function isUpgradable(packageInfo: PackageInfo): PromiseLike<any>;
export declare function getInstallers(packageInfo: PackageInfo): PromiseLike<Installer[]>;
export declare function addRepo(repo: string): void;
export declare function getFallbackBinLocation(): string;
export declare class Installer {
    private _backend;
    private _package;
    readonly name: string;
    constructor(backend: Backend<any>, pkg: any);
    install(outputListener?: (data: string) => void): PromiseLike<boolean>;
}

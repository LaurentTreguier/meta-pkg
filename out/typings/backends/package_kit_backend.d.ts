import Backend from '../backend';
import * as util from '../util';
export declare type PackageInfo = string | string[];
declare class PackageKitBackend extends Backend<PackageInfo> {
    readonly name = "packagekit";
    readonly prettyName = "PackageKit";
    readonly command = "pkcon";
    readonly platforms: string[];
    packageAvailable(packageInfo: PackageInfo): Promise<boolean>;
    install(basicInfo: util.BasicInfo, packageInfo: PackageInfo, outputListener: (data: string) => void): Promise<any>;
    private resolvePackageName;
}
export default PackageKitBackend;

declare abstract class Backend {
    readonly abstract name: string;
    readonly abstract prettyName: string;
    readonly abstract command: string;
    readonly abstract platforms: string[];
    abstract install(packageInfo: any, outputListener: (chunk) => void): PromiseLike<void>;
    readonly available: boolean;
}
export default Backend;
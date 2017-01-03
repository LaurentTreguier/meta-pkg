'use strict';
const repo_manager_1 = require("./repo_manager");
const package_kit_backend_1 = require("./backends/package_kit_backend");
const brew_backend_1 = require("./backends/brew_backend");
const chocolatey_backend_1 = require("./backends/chocolatey_backend");
const fallback_backend_1 = require("./backends/fallback_backend");
const util = require("./util");
const repoManager = new repo_manager_1.default();
const backends = [
    new package_kit_backend_1.default(),
    new brew_backend_1.default(),
    new chocolatey_backend_1.default(),
    new fallback_backend_1.default()
].filter((backend) => backend.available);
function isInstalled(packageInfo) {
    return getPackage(packageInfo).then((pkg) => {
        return pkg.targets.length
            && pkg.targets.every(util.checkExistence);
    });
}
exports.isInstalled = isInstalled;
function isUpgradable(packageInfo) {
    return getPackage(packageInfo).then((pkg) => pkg.backends.fallback
        ? fallback_backend_1.default.isUpgradable(pkg.backends.fallback)
        : false);
}
exports.isUpgradable = isUpgradable;
function getInstallers(packageInfo) {
    let availableBackends;
    let resolvedPackage;
    return getPackage(packageInfo)
        .then((pkg) => {
        availableBackends = backends.filter((backend) => pkg.backends[backend.name]);
        resolvedPackage = pkg;
    }).then(() => Promise.all(availableBackends.map((backend) => backend.packageAvailable(resolvedPackage.backends[backend.name]))))
        .then((results) => availableBackends.filter((backend, i) => results[i]))
        .then((actuallyAvailableBackends) => actuallyAvailableBackends.map((backend) => new Installer(backend, resolvedPackage)));
}
exports.getInstallers = getInstallers;
function addRepo(repo) {
    repoManager.addRepo(repo);
}
exports.addRepo = addRepo;
function getFallbackBinLocation() {
    return fallback_backend_1.default.packagesPath;
}
exports.getFallbackBinLocation = getFallbackBinLocation;
function getPackage(packageInfo) {
    return typeof (packageInfo) === 'string'
        ? repoManager.getPackage(packageInfo)
        : Promise.resolve(packageInfo);
}
class Installer {
    get name() {
        return this._backend.prettyName;
    }
    constructor(backend, pkg) {
        this._backend = backend;
        this._package = pkg;
    }
    install(outputListener) {
        let alreadyInstalled;
        return isInstalled(this._package)
            .then((installed) => {
            alreadyInstalled = installed;
            return this._backend.install(this._package.backends[this._backend.name], outputListener || (() => { }));
        }).then(() => alreadyInstalled);
    }
}
exports.Installer = Installer;
//# sourceMappingURL=index.js.map
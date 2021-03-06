'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("./util");
class Backend {
    get available() {
        return util.checkExistence(this.command) && this.platforms.indexOf(process.platform) !== -1;
    }
    packageAvailable(packageInfo) {
        return Promise.resolve(true);
    }
}
exports.default = Backend;
//# sourceMappingURL=backend.js.map
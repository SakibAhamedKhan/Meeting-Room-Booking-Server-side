"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    var _a;
    const match = (_a = err === null || err === void 0 ? void 0 : err.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg.match(/"([^"]*)"/);
    console.log(match);
    const extractMessage = match && match[1];
    const errorSource = [{
            path: err === null || err === void 0 ? void 0 : err.path,
            message: `${extractMessage} already exists`,
        }];
    return {
        message: "Duplicate Error",
        errorSource,
    };
};
exports.handleDuplicateError = handleDuplicateError;

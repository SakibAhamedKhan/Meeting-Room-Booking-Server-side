"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorSource = err.issues.map((e) => {
        return {
            path: e.path[e.path.length - 1],
            message: e.message,
        };
    });
    const statusCode = 404;
    return {
        statusCode,
        errorSource,
        message: err.name,
    };
};
exports.handleZodError = handleZodError;

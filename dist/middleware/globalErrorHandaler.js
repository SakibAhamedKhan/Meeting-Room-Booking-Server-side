"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandaler = void 0;
const handleCastError_1 = require("../errors/handleCastError");
const handleValidationError_1 = require("../errors/handleValidationError");
const zod_1 = require("zod");
const handleDuplicateError_1 = require("../errors/handleDuplicateError");
const handleZodError_1 = require("../errors/handleZodError");
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandaler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err.name == "CastError") {
        const simplified = (0, handleCastError_1.handleCastError)(err);
        message = simplified.message;
        errorSources = simplified.errorSource;
    }
    else if (err.name === "ValidationError") {
        const simplified = (0, handleValidationError_1.handleValidationError)(err);
        message = simplified.message;
        errorSources = simplified.errorSource;
    }
    else if (err.code === 11000) {
        const simplified = (0, handleDuplicateError_1.handleDuplicateError)(err);
        errorSources = simplified.errorSource;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplified = (0, handleZodError_1.handleZodError)(err);
        errorSources = simplified.errorSource;
        statusCode = simplified.statusCode;
        message = simplified.message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        // global:true,
        success: false,
        message,
        errorSources,
        err,
    });
};
exports.globalErrorHandaler = globalErrorHandaler;

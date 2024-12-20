"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImagesToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const sendImagesToCloudinary = (imageData) => {
    return new Promise((resolve, reject) => {
        // Create an array of promises for the upload process
        const uploadPromises = imageData.map((data) => {
            const imageName = data.filename;
            // Return the promise for each image upload
            return new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload(data.path, { public_id: imageName.trim() }, function (error, result) {
                    var _a, _b;
                    if (error) {
                        reject(error);
                    }
                    else {
                        // Asynchronous file deletion after upload
                        fs_1.default.unlink(data.path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(`File ${imageName} is deleted.`);
                            }
                        });
                        resolve({
                            url: (_a = result === null || result === void 0 ? void 0 : result.secure_url) !== null && _a !== void 0 ? _a : "",
                            public_id: (_b = result === null || result === void 0 ? void 0 : result.public_id) !== null && _b !== void 0 ? _b : "",
                        });
                    }
                });
            });
        });
        // Wait for all uploads to finish and return the results
        Promise.all(uploadPromises)
            .then((results) => {
            resolve(results);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.sendImagesToCloudinary = sendImagesToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });

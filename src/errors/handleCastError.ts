import mongoose from "mongoose";

export const handleCastError = (err: mongoose.Error.CastError) => {
    const errorSource = [{
        path: err?.path,
        message: err?.message,
    }]

    return {
        message: "Case Error", 
        errorSource,
    }
}
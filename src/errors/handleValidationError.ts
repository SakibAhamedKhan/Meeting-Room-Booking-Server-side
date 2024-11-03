import mongoose from "mongoose";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errorSource = Object.values(err.errors).map(
        (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>{
            return {
                path: value?.path,
                message: value?.message,
            }
        }
    );

    return {
        message: "Validation Error", 
        errorSource,
    }
}
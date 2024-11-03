import { ZodError } from "zod";

export const handleZodError = (err: ZodError) => {
  const errorSource = err.issues.map((e) => {
    return {
      path: e.path[e.path.length - 1] as string,
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


export const handleDuplicateError = (err: any) => {
  
    const match = err?.errorResponse?.errmsg.match(/"([^"]*)"/)
    console.log(match);
    const extractMessage = match && match[1];
    const errorSource = [{
      path: err?.path,
      message: `${extractMessage} already exists`,
    }];
  
    
    return {
      message: "Duplicate Error",
      errorSource,
    };
  };
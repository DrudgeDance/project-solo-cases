const errorHandler={

  createErr({ file, method, type, err }) {
    // const { file, method, type, err } = errInfo;
    return { 
      log: `${file}.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in ${file}.${method}. Check server logs for more details.` },
      status: 500,
    };
  }
};
export default errorHandler;
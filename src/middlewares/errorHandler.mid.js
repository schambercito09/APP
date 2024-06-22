function errorHandler(error, req, resp, next) {
  return resp.json({
    statusCode: error.statusCode || 500,
    message: error.message || "CODER API ERROR",
  });
}

export default errorHandler;

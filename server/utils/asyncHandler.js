const asyncHandler = (asyncFn) => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res);
    } catch (err) {
      return next(err);
    }
  };
};

export default asyncHandler;

export const asyncHandler = (passFunc) => (req, res, next) => {
  Promise.resolve(passFunc(req, res, next)).catch(next);
};

const rateLimit = require("express-rate-limit");

export const createPostLimiter = rateLimit({
  windowMs: 60 * 1000 * 5, // 5min
  max: 2, // max 3 request / 5min
});

export const deletePostLimiter = rateLimit({
  windowMs: 60 * 1000 * 2, // 2min
  max: 60, // max 60 request / 2min
});

export const likePostLimiter = rateLimit({
  windowMs: 60 * 1000 * 2, // 2min
  max: 60, // max 60 request / 2min
});

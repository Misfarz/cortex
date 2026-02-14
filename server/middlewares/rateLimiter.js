import rateLimit, {ipKeyGenerator} from "express-rate-limit";

/*
   We use API KEY instead of IP address.
   keyGenerator decides what identifies a user.
*/

const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,              // 10 requests per minute

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },

  keyGenerator: (req) => {
    // rate limit per API key
    return ipKeyGenerator(req.apiKey?.key || req.ip) 
  },
});

export default apiRateLimiter;

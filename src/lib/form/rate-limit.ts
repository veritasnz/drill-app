import LRU from "lru-cache";

const rateLimit = (options: any) => {
    // HACK – basically nothing here is properly typed

    const tokenCache = new LRU({
        max: parseInt(options.uniqueTokenPerInterval || 500, 10),
        maxAge: parseInt(options.interval || 60000, 10),
    });

    return {
        check: (res: any, limit: any, token: any) =>
            new Promise((resolve, reject) => {
                const tokenCount: any = tokenCache.get(token) || [0];
                if (tokenCount[0] === 0) {
                    tokenCache.set(token, tokenCount);
                }
                tokenCount[0] += 1;

                const currentUsage = tokenCount[0];
                const isRateLimited = currentUsage >= parseInt(limit, 10);
                res.setHeader("X-RateLimit-Limit", limit);
                res.setHeader(
                    "X-RateLimit-Remaining",
                    isRateLimited ? 0 : limit - currentUsage
                );

                return isRateLimited ? reject() : resolve(true);
            }),
    };
};

/**
 * Function to determine if the rate limit has been exceeded.
 * Returns a rejected Promise object if exceeded
 * https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.js
 */
const rateLimiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default rateLimiter;

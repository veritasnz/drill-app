import { NextApiRequest, NextApiResponse } from "next";

import rateLimiter from "../../lib/form/rate-limit";
// import backupEmail from "lib/backupEmail";
import {
    sendAdminReceiptEmail,
    sendUserReceiptEmail,
} from "../../lib/form/email";

const MAX_REQUESTS_PER_MIN = 3;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Fallback response
    let response = {
        code: 400,
        message: "Malformed request",
    };

    if (req.method === "POST") {
        // Limit rate of requests to 3 per minute
        try {
            await rateLimiter.check(res, MAX_REQUESTS_PER_MIN, "CACHE_TOKEN");
        } catch {
            res.status(429).json({ error: "Rate limit exceeded" });
            return;
        }

        // Back up emails incase of failed delivery
        // await backupEmail(req.body);

        // Send emails
        try {
            if(req.body.email) await sendUserReceiptEmail(req.body);
            await sendAdminReceiptEmail(req.body);

            response = {
                code: 200,
                message: "Receipt email(s) sent succesfully",
            };
        } catch (error: any) {
            response = {
                code: 500,
                message: `${error.name}: ${error.message}`,
            };
        }
    }

    res.status(response.code).json({ message: response.message });
}

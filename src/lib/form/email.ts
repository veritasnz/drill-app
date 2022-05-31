import SMTPTransport from "nodemailer";

const transporter = SMTPTransport.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
} as {}); // HACK: forced type

interface EmailMessageFormat {
    email?: string;
    subject?: string;
    message: string;
}

/**
 * Sends the user a receipt email
 * @param {EmailMessageFormat} message
 * @returns {string} mailId
 */
export async function sendUserReceiptEmail(message: EmailMessageFormat) {
    console.log(
        `Attempting to send USER (${message.email}) receipt with following message:`
    );
    console.log(message);

    const info = await transporter
        .sendMail({
            from: `"Wonideto" <${process.env.SMTP_USER}>`,
            to: message.email,
            subject: `Your feedback has been received – Wonideto`,
            text:
                `Hi there,\n` +
                `\n` +
                `Your message to Wonideto has been received.\n` +
                `We'll get back to you about this when we can.\n` +
                `\n` +
                `Regards,\n` +
                `The Wonideto team`,
        })
        .catch((e) => {
            console.log("Error sending USER receipt.");
            console.log(`${e.name}: ${e.message}`);
        });

    if (info) {
        if (info.accepted.length > 0) console.log("Success!");
        return info.messageId;
    }
}

/**
 * Sends the admin a receipt email
 * @param {EmailMessageFormat} message
 * @returns {string} mailId
 */
export async function sendAdminReceiptEmail(message: EmailMessageFormat) {
    console.log(
        `Attempting to send ADMIN (${process.env.SMTP_USER}) with message:`
    );
    console.log(message);

    let subject = "Wonideto feedback received"; //fallback
    if (message.subject) subject += `- ${message.subject}`;

    const info = await transporter
        .sendMail({
            from: `"Wonideto" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject,
            text:
                `The following feedback has been received:\n` +
                `\n` +
                `Email:\n` +
                `${message.email || "None specified"}\n` +
                `\n` +
                `Subject:\n` +
                `${message.subject || "None specified"}\n` +
                `\n` +
                `Message:\n` +
                `${message.message}`,
        })
        .catch((e) => {
            console.log("Error sending ADMIN receipt.");
            console.log(`${e.name}: ${e.message}`);
        });

    if (info) {
        if (info.accepted.length > 0) console.log("Success!");
        return info.messageId;
    }
}

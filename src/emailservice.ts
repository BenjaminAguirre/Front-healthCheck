import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

// Import NodeMailer (after npm install)

async function emailAccountBalance(subject: string, htmlresponse: string) {
    // Async function enables allows handling of promises with await
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
            port: 465, // Port for SMTP (usually 465)
            secure: true, // Usually true if connecting to port 465
            auth: {
                user: process.env.GMAIL, // Your email address
                pass: process.env.GMAIL_PASSWORD, // Password (for gmail, your app password)
            },
        });
        console.log(transporter);
        

        // Define and send message inside transporter.sendEmail() and await info about send from promise:
        let info = await transporter.sendMail({
            from: process.env.GMAIL,
            to: process.env.GMAIL_RECIPIENT,
            subject: subject,
            html: htmlresponse,
        });

        console.log(info.messageId);
    } catch (error) {
        console.error('Error sending Email:', error);
    }
    // First, define send settings by creating a new transporter: // Random ID generated after successful send (optional)
}


export {
    emailAccountBalance
}
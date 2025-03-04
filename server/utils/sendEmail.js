import nodemailer from "nodemailer";

const myEmail = "neha06844@gmail.com";
const myAppPassword = "hqtm drin dkaw dnug";  // Use the App Password generated
const myHost = "smtp.gmail.com";

async function sendEmail(emailData) {
    try {
        let transporter = nodemailer.createTransport({
            host: myHost,
            port: 465,  // SSL port for Gmail
            secure: true,  // Use SSL
            auth: {
                user: myEmail,
                pass: myAppPassword  // Use the App Password here
            }
        });

        let sender = await transporter.sendMail({
            from: myEmail,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.text
        });

        console.log("Email sent successfully", sender.messageId);
        
    } catch (error) {
        console.log(error);
    }
}

// sendEmail({
//     to: "suhail@code.in",
//     subject: "Test Email",
//     text: "Hello Test"
// });

export default sendEmail
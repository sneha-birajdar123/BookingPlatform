import nodemailer from "nodemailer"

const myEmail = "neha05844@gmail.com"
const myPassword = "lrzvxohoidliwspy"
const myHost = "smtp.gmail.com"

async function sendEmail(emailData) {
    try {
        let transpoter = nodemailer.createTransport({
            host: myHost,
            port: 465,
            secure: true,
            auth: {
                user: myEmail,
                pass: myPassword
            }
        })
        let sender = await transpoter.sendMail({
            from: myEmail,
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html
        })

        console.log("Email send successfully", sender.messageId);
        
    } catch (error) {
        console.log(error);
    }
}
export default sendEmail
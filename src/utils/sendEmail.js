import nodemailer from "nodemailer";

export const sendEmail = async (to, resetLink) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Test " <${process.env.EMAIL_USER}>`,
        to,
        subject: "Password Reset Link",

        html: `
                <h2>Password Reset</h2>
                <p>
                    {" "}
                    click the link below to reset your password. It expires in 5 Minues
                </p>
                <a href="${resetLink}"> ${resetLink}</a>
        `,
    };

    await transporter.sendMail(mailOptions);
};

const { createTransport } = require("nodemailer");

const resetPasswordMail = async (name, email, resetToken) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.emailUser,
        pass: process.env.emailPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.emailUser,
      to: email,
      subject: "For reset password",
      html: `Access Token  is => ${resetToken} `,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err.message);
        return;
      }
      transporter.close();
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = resetPasswordMail;

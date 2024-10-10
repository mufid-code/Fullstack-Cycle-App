import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string; // Menambahkan opsi untuk mengirim email HTML
}

export const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false, // use SSL
    auth: {
      user: process.env.EMAIL_USER || 'bd4443b897d591',
      pass: process.env.EMAIL_PASS || '70641bd86eea3b',
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html, // html body jika disediakan
  };

  await transporter.sendMail(mailOptions, function (err, result) {
    if (err) {
      console.error('Error sending email:', err);
      throw new Error('Error sending email');
    } else {
      console.log('Sent mail: ', result.response);
    }
  });
};

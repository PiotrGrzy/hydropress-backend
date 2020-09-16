import nodemailer from 'nodemailer';

export const sendConfirmationEmails = async (order, userData) => {
  console.log(userData);
  const { address, email, username, departmentName } = userData;
  const transporter = nodemailer.createTransport({
    host: 'wena.nazwa.pl',
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: 'hydropress@wena.net.pl',
    to: email,
    subject: 'Potwierdzenie złożenia zamówienia nr: ' + order._id,
    text: 'Testing nodemailer',
    html: `<h1>Zamówienie dla ${departmentName} </h1> <p>Zamawiający ${username}</>`,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

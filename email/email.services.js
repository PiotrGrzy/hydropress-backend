import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import Handlebars from 'handlebars';
import pkg from '@handlebars/allow-prototype-access';
import User from '../user/User.js';
const { allowInsecurePrototypeAccess } = pkg;

const __dirname = path.resolve();

const transporter = nodemailer.createTransport({
  host: 'wena.nazwa.pl',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

const options = {
  viewEngine: {
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  },
  extName: '.hbs',
  viewPath: 'views',
};

transporter.use('compile', hbs(options));

export const sendConfirmationEmails = async (order, userData, diffAddress) => {
  let deliveryAddress = userData.address;

  if (diffAddress.exists) {
    deliveryAddress = diffAddress.data;
  }

  const emailOptions = {
    from: 'hydropress@wena.net.pl',
    to: userData.email,
    cc: ['piotr.grzymowicz1@gmail.com'],
    subject: `Potwierdzenie złożenia zamówienia nr: ${order._id}`,
    template: 'orderConfirmation',
    context: {
      user: userData,
      order: order,
      address: deliveryAddress,
    },
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

export const sendStatusUpdateEmail = async (order, mailNum) => {
  try {
    const user = await User.findOne({ _id: order.userId });

    const emailOptions = {
      from: 'hydropress@wena.net.pl',
      to: user.email,
      cc: ['piotr.grzymowicz1@gmail.com'],
      subject: `Zmiana statusu zamówienia nr: ${order._id}`,
      template: 'orderSentConfirmation',
      context: {
        order: order,
        mailNum: mailNum,
      },
    };

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  } catch (err) {
    console.log(err);
  }
};

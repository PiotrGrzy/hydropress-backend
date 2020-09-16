import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import Handlebars from "handlebars";
import pkg from "@handlebars/allow-prototype-access";
const { allowInsecurePrototypeAccess } = pkg;

const __dirname = path.resolve();

export const sendConfirmationEmails = async (order, userData) => {
  console.log(userData);
  console.log(order);
  const { address, email, username, departmentName } = userData;
  const transporter = nodemailer.createTransport({
    host: "wena.nazwa.pl",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  const options = {
    viewEngine: {
      partialsDir: __dirname + "/views/partials",
      layoutsDir: __dirname + "/views/layouts",
      extname: ".hbs",
    },
    extName: ".hbs",
    viewPath: "views",
  };

  transporter.use("compile", hbs(options));

  const emailOptions = {
    from: "hydropress@wena.net.pl",
    to: email,
    subject: "Potwierdzenie złożenia zamówienia nr: " + order._id,
    template: "orderConfirmation",
    context: {
      userName: username,
      userEmail: email,
      department: departmentName,
      country: address.country,
      city: address.city,
      street: address.street,
      house: address.house,
      code: address.postalCode,
      items: order.items,
    },
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

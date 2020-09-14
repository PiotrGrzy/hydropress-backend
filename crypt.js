import bcrypt from "bcryptjs";

const crypt = async (psw) => {
  const salt = await bcrypt.genSalt(10);

  const crypted = await bcrypt.hash(psw, salt);
  console.log(crypted);
};
crypt("Abc123456");

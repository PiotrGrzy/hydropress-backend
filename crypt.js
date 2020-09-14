import bcrypt from 'bcryptjs';

const crypt = (psw) => {
  bcrypt.hash(psw, 10).then((res) => console.log(res));
};
crypt('Abc123456');

import jwt from 'jsonwebtoken';

const authenticate = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json(errors.array());
  //   }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }, '+hashedPassword');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }
    // const passwordCorrect = await bcrypt.compare(
    //   password,
    //   user.hashedPassword
    // );

    const passwordCorrect = user.hashedPassword === password;

    if (!passwordCorrect) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    const { hashedPassword, ...rest } = user;
    const payload = {
      user: {
        ...rest,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.send(users);
};

const getSingleUser = async (req, res) => {
  const users = await User.find({ _id: req.params.id });
  res.send(users);
};

const registerUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body });
    const { hashedPassword, ...rest } = newUser;
    res.send(rest);
  } catch (err) {
    res.status(501).send(err);
  }
};

export const userService = {
  authenticate,
  getAllUsers,
  getSingleUser,
  registerUser,
};

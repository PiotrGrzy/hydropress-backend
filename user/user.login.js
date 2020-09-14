import Router from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "express-validator";
import User from "./User.js";

const { check, validationResult } = pkg;
const router = Router();

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }, "+hashedPassword");
      if (!user) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
      // const passwordCorrect = await bcrypt.compare(
      //   password,
      //   user.hashedPassword
      // );

      const passwordCorrect = user.hashedPassword === password;

      if (!passwordCorrect) {
        return res.status(400).json({ msg: "Invalid username or password" });
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
  }
);

router.get("/", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

export default router;

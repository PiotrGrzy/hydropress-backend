import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authorize based on user role
    (req, res, next) => {
      // authenticate JWT token and attach user to request object (req.user)
      // get token from header
      const token = req.header('x-auth-token') || req.header('Authorization');

      // Check if no token

      if (!token) {
        return res
          .status(401)
          .json({ msg: 'No token provided, authorization denied' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user._doc;

      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized on auth' });
      }

      // authentication and authorization successful
      next();
    },
  ];
};

export default authorize;

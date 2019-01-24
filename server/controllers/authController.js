const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const db = req.app.get("db");

  const user = await db.get_user([req.body.username]);
  const existinguser = user[0];
  if (existinguser) {
    return res.status(409).json("Username taken");
  } else {
    const hash = await bcrypt.hash(req.body.password, 12);
    let registereduser = await db.register_user([req.body.username, hash]);
    const user = registereduser[0];
    req.session.user = {
      username: user.username
    };
    return res.status(201).json(req.session.user);
  }
};

const login = async (req, res) => {
  const db = req.app.get("db");

  const finduser = await db.get_user([req.body.username]);
  const user = finduser[0];

  if (!user) {
    res
      .status(401)
      .json("User not found. Please register as a new user before logging in.");
  } else {
    const isAuthenticated = bcrypt.compareSync(req.body.password, user.hash);
    if (!isAuthenticated) {
      res.status(403).json("Incorrect username or password");
    } else {
      req.session.user = {
        isAdmin: user.isAdmin,
        id: user.user_id,
        username: user.username,
        picture: user.picture,
        name: user.name,
        requested: user.amount_requested,
        received: user.amount_received
      };
      res.status(200).json(req.session.user);
    }
  }
};

const logout = (req, res) => {
  req.session.destroy();
};

const adminOnly = (req, res) => {
  res.status(200).json(req.session);
};

module.exports = {
  register,
  login,
  adminOnly,
  logout
};

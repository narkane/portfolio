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

const edit = async (req, res) => {
  const db = req.app.get("db");

  const user = await db.get_user([req.body.username]);
  const existinguser = user[0];
  if (!existinguser) {
    db.change_name([req.session.user.username, req.body.username]);
    req.session.user = {
      username: req.body.username
    };
    return res.status(200).json(req.session.user);
  } else {
    return res.status(409).json("OMG that name EXISTS... DUH-amn");
    // const hash = await bcrypt.hash(req.body.password, 12);
    // let registereduser = await db.register_user([req.body.username, hash]);
    // const user = registereduser[0];
    // req.session.user = {
    //   username: user.username
  }
};

const login = async (req, res) => {
  const db = req.app.get("db");

  if (!req.body.username && req.session.user.username) {
    req.body.username = req.session.user.username;
  }
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

const joinDPTeam = async (req, res) => {
  const db = req.app.get("db");

  const u_id = req.session.user.id;
  const team = req.body.team;
  const desc = req.body.desc;
  console.log("FDASFADSFDASFA: ");
  console.log(u_id);
  console.log("\nFDASFADSFDASFA: ");

  let newDPentry = await db.join_DP_team([team, desc, 1, u_id]);
  // const user = registereduser[0];
  return res.status(201).json(newDPentry[0]);
};

const listDPTeams = async (req, res) => {
  const db = req.app.get("db");

  const findDPusers = await db.list_devpool_teams();
  console.log(findDPusers);
  res.status(200).json(findDPusers);
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json("YOU GONE!!");
};

const adminOnly = (req, res) => {
  res.status(200).json(req.session);
};

const removeUser = async (req, res) => {
  const db = req.app.get("db");

  const user = await db.get_user([req.session.user.username]);
  const existinguser = user[0];
  if (existinguser) {
    console.log(existinguser + " | " + req.session.user.username);
    db.delete_user([req.session.user.username]);
    req.session.destroy();
    return res.status(200).json("User deleted!");
  } else {
    console.log(existinguser + " |FAIL| " + req.session.user.username);
    return res
      .status(409)
      .json("User doesn't exist? " + req.session.user.username);
  }
};

module.exports = {
  register,
  edit,
  login,
  joinDPTeam,
  listDPTeams,
  adminOnly,
  logout,
  removeUser
};

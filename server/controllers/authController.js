const bcrypt = require("bcryptjs");

var ssn;

const register = async (req, res) => {
  const db = req.app.get("db");

  console.log(req.session);

  const user = await db.get_user([req.body.username]);
  const existinguser = user[0];
  if (existinguser || req.body.username == "") {
    return res.status(409).json("Username taken");
  } else {
    const hash = await bcrypt.hash(req.body.password, 12);
    let registereduser = await db.register_user([req.body.username, hash]);
    const user = registereduser[0];

    req.session.user = {
      username: user.username,
      password: req.body.password
    };
    req.session.save(err => {
      if (!err) {
        console.log(req.session);
      } else {
        console.log(err);
      }
    });

    return res.status(201).json(req.body.username);
    // res.sendStatus(201);
  }
};

const edit = async (req, res) => {
  const db = req.app.get("db");

  if (!(await db.get_user([req.body.newName]))[0]) {
    try {
      // check password
      const finduser = await db.get_user([req.body.oldName]);
      const user = finduser[0];

      if (!user) {
        res
          .status(401)
          .json(
            "User not found. Please register as a new user before logging in."
          );
      } else {
        const isAuthenticated = bcrypt.compareSync(
          req.body.password,
          user.hash
        );
        if (!isAuthenticated) {
          res.status(403).json("Incorrect username or password");
        } else {
          db.change_name([req.body.oldName, req.body.newName]);
          req.session.user = {
            username: req.body.newName
          };
          return res.status(200).json(req.session.user);
        }
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(409).json("OMG that name EXISTS... DUH-amn");
  }
};

const login = async (req, res) => {
  const db = req.app.get("db");
  console.log("body: ");
  console.log(req.body.username);
  console.log(req.session);
  console.log(req.session.username);

  if (
    !req.body.username &&
    !req.body.password &&
    req.session.username &&
    req.session.password
  ) {
    console.log("Using cookies for login. . .");
    req.body.username = req.session.username;
    console.log(req.body.username);
    req.body.password = req.session.password;
  }

  const user = await db.get_user([req.body.username]);
  const existinguser = user[0];

  // console.log("find user: " + JSON.stringify(existinguser));

  if (!existinguser) {
    res
      .status(401)
      .json("User not found. Please register as a new user before logging in.");
  } else {
    try {
      const isAuthenticated = bcrypt.compareSync(
        req.body.password,
        existinguser.hash
      );
      if (!isAuthenticated) {
        res.status(403).json("Incorrect username or password");
      } else {
        console.log("add username and pass to session user obj next...");
        // req.session.user = {
        // isAdmin: user.is_admin,
        // id: user.id,
        req.session.user = {
          username: existinguser.username,
          password: req.body.password
        };
        req.session.save(err => {
          if (!err) {
            console.log(req.session);
          } else {
            console.log(err);
          }
        });

        return res.status(200).json(existinguser);
        // return res.sendStatus(200);
      }
    } catch (e) {
      console.log("ERROR: " + e);
    }
  }
};

const joinDPTeam = async (req, res) => {
  const db = req.app.get("db");

  const u_id = req.session.user.id;
  const team = req.body.team;
  const desc = req.body.desc;
  const lead = await db.get_user([req.body.lead]);
  console.log("user_id: ");
  console.log(u_id);
  console.log("\nlead_id: " + lead[0].id);

  let newDPentry = await db.join_DP_team([team, desc, lead[0].id, u_id]);
  // const user = registereduser[0];
  return res.status(201).json(newDPentry[0]);
};

const listDPMembers = async (req, res) => {
  const db = req.app.get("db");

  const findDPusers = await db.list_devpool_members();
  console.log(findDPusers);
  return res.status(200).json(findDPusers);
};

const listDPTeams = async (req, res) => {
  const db = req.app.get("db");

  const findDPusers = await db.list_devpool_teams();
  console.log(findDPusers);
  return res.status(200).json(findDPusers);
};

const logout = (req, res) => {
  req.session.destroy();
  return res.status(200).json("YOU GONE!!");
};

const adminOnly = (req, res) => {
  return res.status(200).json(req.session);
};

const removeUser = async (req, res) => {
  const db = req.app.get("db");

  console.log(req.session);

  const user = await db.get_user([req.body.username]);
  const existinguser = user[0];

  // console.log("find user: " + JSON.stringify(existinguser));

  if (existinguser) {
    console.log(JSON.stringify(existinguser) + "\n user: " + req.body.username);
    //auth with sent password
    const isAuthenticated = bcrypt.compareSync(
      req.body.password,
      existinguser.hash
    );
    if (!isAuthenticated) {
      res.status(403).json("Incorrect username or password");
    } else {
      db.delete_user([req.body.username]);
      req.session.destroy();
      return res.status(200).json("User deleted!");
    }
  } else {
    console.log(existinguser + " |FAIL| " + req.session.username);
    return res.status(409).json("User doesn't exist? " + req.body.username);
  }
};

module.exports = {
  register,
  edit,
  login,
  joinDPTeam,
  listDPTeams,
  listDPMembers,
  adminOnly,
  logout,
  removeUser
};

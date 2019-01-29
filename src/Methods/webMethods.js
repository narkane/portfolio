toggleAdmin = () => {
  const { isAdmin } = this.state;
  //this.setState({ isAdmin: !isAdmin });
  return !isAdmin;
};

login = (u, p) => {
  axios
    .post("/auth/login", {
      username: u,
      password: p
    })
    .then(resp => {
      console.log(resp);
      if (resp.status == 200) {
        //this.setState({ loggedIn: true });
        return true;
      }
    });
};

register = (u, p) => {
  axios
    .post("/auth/register", {
      username: u,
      password: p
    })
    .then(resp => {
      console.log(resp);
    });
};

logout = () => {
  axios.get("/auth/logout").then(resp => {
    console.log(resp);
    alert(resp.data);
    if (resp.status == 200) {
      //this.setState({ loggedIn: false });
      return false;
    }
  });
};

deleteUser = () => {
  axios.delete("/auth/delete").then(resp => {
    alert(resp.data);
    console.log(resp);
    if (resp.status == 200) {
      //this.setState({ loggedIn: false });
      return false;
    }
  });
};

module.exports = {
  login,
  logout,
  deleteUser,
  register
};

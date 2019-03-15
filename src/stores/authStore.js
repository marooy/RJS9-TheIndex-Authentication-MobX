import { decorate, computed, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  user = null;

  setUser = async token => {
    if (token) {
      localStorage.setItem("myToken", token);
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const userDecoded = jwt_decode(token);
      this.user = userDecoded;
    } else {
      localStorage.removeItem("myToken");
      delete axios.defaults.headers.common.Authorization;
      this.user = null;
    }
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.setUser();
      }
    }
  };

  Signup = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );

      const user = res.data;
      this.setUser(user.token);
      console.log("Signed UP!!!!");
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  Login = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      console.log("You ARE LOGED IN");
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  Logout = () => {
    this.setUser();
    console.log("BYE BYE You ARE LOGED OUT!!!!");
  };
}

decorate(AuthStore, {
  user: observable
});
const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;

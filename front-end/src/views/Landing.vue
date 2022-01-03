<template>
  <div class="landing">
    <div class="landing-brand">
      <h1>ReciPie</h1>
    </div>
    <div class="forms">
      <div class="signin">
        <h2>Signin</h2>
        <form @submit.prevent="login">
          <label for="signin-email">EMAIL</label>
          <input
            placeholder="Enter your email"
            type="email"
            v-model="signin_form.signin_email"
            name="signin-email"
            id="signin-email"
            required
          />
          <label for="signin-password">PASSWORD</label>
          <input
            placeholder="Enter your password"
            type="password"
            v-model="signin_form.signin_password"
            name="signup-password"
            id="signin-password"
          />
          <button type="submit">SIGN IN</button>
        </form>
      </div>
      <div class="vl"></div>
      <div class="signup">
        <h2>Signup</h2>
        <form>
          <label for="signup-email">EMAIL</label>
          <input
            placeholder="Enter your email"
            type="email"
            v-model="signup_form.signup_email"
            name="signup-email"
            id="signup-email"
            required
          />
          <label for="signup-password">PASSWORD</label>
          <input
            placeholder="Enter your password"
            type="password"
            v-model="signup_form.signup_password"
            name="signup-password"
            id="signup-password"
          />
          <h1>{{ isAutorized }}</h1>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data: () => {
    return {
      signin_form: {
        signin_email: "",
        signin_password: "",
      },
      signup_form: {
        signup_email: "",
        signup_password: "",
      },
    };
  },
  computed: {
    ...mapState(["isAutorized", "userId"]),
  },
  methods: {
    ...mapMutations(["authorize", "setUserData"]),

    login(e) {
      e.preventDefault();
      axios
        .post("http://localhost:8000/api/actions/login", this.signin_form)
        .then((result) => {
          window.localStorage.setItem("auth-token", result.data.token);
          this.authorize(true);
          this.setUserData(result.data);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.landing-brand > h1 {
  font-family: "Rochester", cursive;
  font-size: 6rem;
  font-weight: 200;
  background: -webkit-linear-gradient(#ff00c7, #0047ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  justify-content: center;
}
.forms {
  display: flex;
  justify-content: center;
  width: 75%;
}

.vl {
  width: 5px;
  height: 35vh;
  margin-top: auto;
  background: -webkit-linear-gradient(#ff00c7, #0047ff);
}
.signin,
.signup {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
}
.signup > form,
.signin > form {
  width: 70%;
  flex-direction: column;
  display: flex;
  row-gap: 15px;
}

.signin > h2,
.signup > h2 {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 250%;
}
.signin > form > input:focus,
.signup > form > input:focus {
  border: none;
  /* outline: red; */
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.signin > form > input,
.signup > form > input {
  height: 45px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  padding-left: 35px;
  padding-right: 35px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 400;
  font-family: "Raleway";
}

.signin > form > label,
.signup > form > label {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
}
.signin > form > button,
.signup > form > button {
  font-family: "Raleway", sans-serif;
  border: none;
  height: 2rem;
  background: -webkit-linear-gradient(180deg, #ff00c7c4, #0047ffcf);
  width: 80px;
  margin-left: auto;
  border-radius: 20px;
  color: #fff;
}
</style>

<template>
  <div class="home">
    <div class="navbar">
      <div class="brand">
        <h2 class="brand-title">ReciPie</h2>
      </div>
      <div class="brand">
        <h2 class="brand-title">{{ isAuthorized ? userId : "" }}</h2>
      </div>
      <div class="brand">
        <h2 class="brand-title">ReciPie</h2>
      </div>
    </div>

    <div class="container">
      <div v-for="recipe in recipes" :key="recipe.id" class="card">
        <div class="image">
          <img src="../assets/beef-burger.jpg" alt="" />
          <i class="far fa-star"></i>
          <i class="far fa-heart"></i>
        </div>
        <div class="card-bottom">
          <h3 class="title">{{ recipe.title }}</h3>
          <p class="description">{{ recipe.description }}</p>
        </div>
      </div>
    </div>
    <button class="floating">+</button>
  </div>
</template>

<script>
const auth_token = localStorage.getItem("auth-token");
import { mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      recipes: [],
    };
  },
  computed: {
    ...mapState(["isAuthorized", "userId"]),
  },
  methods: {
    ...mapMutations(["authorize"]),
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/actions/recipes")
      .then((res) => {
        console.log(res.status)
        const data = JSON.stringify(res.data.recipes);
        this.recipes = JSON.parse(data);
        console.log(this.recipes);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style>
.floating {
  position: absolute;
  width: 60px;
  height: 60px;
  background: -webkit-linear-gradient(#ff00c7, #0047ff);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.floating:hover {
  cursor: pointer;
  background: -webkit-linear-gradient(179deg, #ff00c8d0, #0047ff);
  width: 52px;
  height: 52px;
  transition: 0.2s ease-in-out;
}
.floating {
  position: fixed;
  width: 50px;
  height: 50px;
  background: -webkit-linear-gradient(179deg, #b6018fb8, #0047ff);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  border: none;
  border-radius: 50%;
  font-size: 2.5rem;
  color: #fff;
  font-weight: lighter;
  right: 30px;
  bottom: 30px;
}
/* Card */

.card:hover {
  transition: 5s ease-in-out;
  cursor: pointer;
}
.card {
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  background: #f7f7f7;
  padding: 5px;
  /* transition: 1s ease-in-out; */
}

.card-bottom {
  font-family: "Raleway", sans-serif;
  padding: 0 10px;
}
.card-bottom > p {
  font-weight: 400;
  font-size: 15px;
  color: rgb(49, 49, 49);
}

.card > .image > img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  transition: 1s ease-in-out;
}
.card > .image > i {
  z-index: 100;
  font-size: 25px;
  margin: 10px 20px 0 10px;
}

.card-bottom > h3 {
  margin: 10px 5px 0px 0px;
}

.container {
  display: grid;
  gap: 1.5rem;
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  top: 130px;
  row-gap: 1.5rem;
  margin: 50px;
}
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 0 35px;
  width: 90%;
  margin-top: 10px;
  height: 70px;
  background: rgb(255, 255, 255);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  border-radius: 20px;
}

.brand > h2 {
  font-family: "Rochester", cursive;
  font-size: 3rem;
  font-weight: 200;
  background: -webkit-linear-gradient(#ff00c7, #0047ff);
  -webkit-background-clip: text;
  margin: auto;
  -webkit-text-fill-color: transparent;
}
</style>

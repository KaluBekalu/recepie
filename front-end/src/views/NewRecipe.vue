<template>
  <div>
    <h1 className="create-new-header">Create New Recipe</h1>

    <!-- - create a food recipe  
        - set title --
        - description --
        - set categories --
        - set time it takes --
        - create steps (must be dynamic)
        - add ingredients (must be dynamic)
        - upload multiple images (must choose featured image to use for thumbnail) -->

    <form class="new-recipe-p1" @submit.prevent="done">
      <div class="part-one">
        <div class="input-group">
          <label>Titile</label
          ><input
            v-model="data.title"
            type="text"
            name="title"
            required
            placeholder="Title"
          />
        </div>

        <div class="input-group">
          <label> Duration</label>
          <input
            v-model="data.duration"
            type="number"
            name="durations"
            required
            placeholder="Durations"
            min="0"
          />
        </div>
        <div class="input-group">
          <label>Category</label>
          <select name="category" v-model="data.category">
            <option value="" disabled selected>Select category</option>
            <option value="Breakfast recipes">Breakfast recipes</option>
            <option value="Breakfast recipes">Breakfast recipes</option>
            <option value="Dinner recipes">Dinner recipes</option>
            <option value="Salad recipes">Salad recipes</option>
            <option value="Side-dish recipes">Side-dish recipes</option>
          </select>
        </div>
        <div class="input-group">
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            required
            placeholder="Description"
            id="textarea"
            rows="54"
            cols="50"
            v-model="data.description"
          />
        </div>
      </div>

      <div class="ingridients">
        <h2>Ingridients ({{ data.ingridients.length }})</h2>
        <div class="ingridients-view">
          <form class="ingridients-input">
            <input
              type="text"
              v-model="ingridient"
              placeholder="Enter an ingridient ..."
            />
            <button @click.prevent="addIngridients"></button>
          </form>
        </div>
        <ul class="ingridients-list">
          <li v-for="item in data.ingridients" :key="item.id">
            <div class="ingridient">
              <p>{{ item }}</p>
            </div>
            <i
              class="remove-ingridient far fa-times"
              @click="removeIngridient"
            ></i>
          </li>
        </ul>
      </div>

      <br />
      <div class="steps">
        <h2>Steps</h2>
        <div class="steps-view">
          <div class="steps-input">
            <input type="text" v-model="step" placeholder="Enter a step ..." />
            <button @click.prevent="addSteps"></button>
          </div>
        </div>
        <ul class="steps-list">
          <li v-for="item in data.steps" :key="data.steps.indexOf(item)">
            <div class="step-head">
              <h3>Step {{ data.steps.lastIndexOf(item) + 1 }}</h3>
              <i
                class="remove-step far fa-times"
                :id="data.steps.indexOf(item)"
                @click="removeStep"
              ></i>
            </div>
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>

      <!-- <div class="images">
        <div>
          <div class="container">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <input type="file" @change="uploadFile" multiple />
              </div>

              <div class="form-group">
                <button class="btn btn-success btn-block btn-lg">Upload</button>
              </div>
            </form>
          </div>
        </div>
        <div class="images-preview">
          <img src="../assets/food1.jfif" alt="" />
          <img src="../assets/food1.jfif" alt="" />
          <img src="../assets/food1.jfif" alt="" />
          <img src="../assets/food1.jfif" alt="" />
        </div>
      </div> -->

      <button className="button-done" type="submit">Done</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ingridient: "",
      step: "",
      data: {
        title: "",
        description: "",
        duration: 0.0,
        category: "",
        ingridients: [
          // title: "Test delicious ",
          // description: "This is a test description",
          // duration: 1.0,
          // category: "Breakfast",
          // img: [],
          // "3 tablespoons olive oil",
          // "1 teaspoon dried thyme",
          // "2 bunches scallions, thinly sliced",
          // "Salt and pepper, to taste",
          // "1/2 cup freshly grated Parmesan",
          // "1/2 cup chopped fresh parsley",
        ],
        steps: [
          // "Preheat oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
          // "In a bowl, mix together butter, Dijon mustard, Worcestershire sauce, poppy seeds, and dried onion. Separate the tops from bottoms of the roll.",
          // "Bake in the preheated oven until the rolls are lightly browned and the cheese has melted, about 20 minutes. Slice into individual rolls through the ham and cheese layers to serve.",
          // "Leave in the preheated oven until the rolls  cheese has melted, about 20 minutes. Worcestershire sauce, poppy seeds, and dried onion, Slice into individual rolls through the ham and cheese layers to serve.",
          // " Grease a 9x13-inch baking dish. Preheat oven to 350 degrees F (175 degrees C).",
          // "Slice into individual rolls through the ham and cheese layers to serve.",
        ],
      },
    };
  },
  methods: {
    uploadFile(event) {
      this.files = event.target.files;
    },
    handleSubmit() {
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append("files", this.files[i]);
      }
      axios
        .post("http://localhost:8000/api/actions/new", formData, {})
        .then((res) => {
          console.log(res);
        });
    },
    onSelect() {
      console.log("Uploading");
      const file = this.$refs.file.files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      axios
        .post("http://localhost:8000/api/actions/new", formdata)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    remove(e) {
      console.log(e);
    },
    addIngridients(e) {
      if (this.ingridient !== "") {
        this.data.ingridients.push(this.ingridient);
      }
      this.ingridient = "";
    },
    addSteps(e) {
      if (this.step !== "") {
        this.data.steps.push(this.step);
      }
      this.step = "";
    },
    removeIngridient(e) {
      this.data.ingridients = this.data.ingridients.filter(
        (ingridient) => this.data.ingridients.indexOf(ingridient) != e.target.id
      );
    },
    removeStep(e) {
      this.data.steps = this.data.steps.filter(
        (item) => this.data.steps.indexOf(item) != e.target.id
      );
    },
    done() {
      axios
        .post("http://localhost:8000/api/actions/new", this.data)
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.images-preview {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
.images-preview > img {
  object-fit: cover;
  width: 20rem;
  height: 15rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}
.images-preview > img:hover {
  cursor: pointers;
}

.images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
/* input[type="file"] {
  display: none;
} */
.file-upload {
  border: 1px solid #ccc;
  border-radius: 20px;
  display: inline-block;
  width: fit-content;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 130%;
}
.file-upload > i {
  font-size: 300%;
}
.part-one {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.input-group {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.create-new-header {
  text-align: center;
}
.new-recipe-p1 {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
  gap: 30px;
}
.input-group > textarea:focus,
.input-group > select:focus,
input:focus {
  outline: none;
}
.input-group > textarea,
.input-group > select,
input {
  height: 50px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  padding-left: 35px;
  padding-right: 35px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 400;
  font-family: "Raleway";
}
#textarea {
  height: 150px;
}

.steps {
  display: flex;
  flex-direction: column;
}
.steps-view {
  display: flex;
  justify-content: center;
}
.steps-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.steps-input > input {
  width: 70%;
}
.steps-input > button {
  display: none;
}
.steps-list {
  gap: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.steps-list > li {
  list-style-type: none;
  background: #fff;
  padding: 0px 10px;
  margin: 0px 5px;
  color: #000000;
  margin-bottom: 3px;
  font-size: 120%;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}
.step-head {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px 0 10px;
}
.remove-step {
  width: 10px;
  height: 10px;
  font-size: 30px;
  display: inline;
  margin-top: 5px;
  margin-right: 5px;
}

.remove-step:hover {
  color: red;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.ingridients {
  display: flex;
  flex-direction: column;
}
.ingridients > h2,
.steps > h2 {
  align-self: center;
}
.ingridients-view {
  display: flex;
  justify-content: center;
}
.ingridients-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.ingridients-input > input {
  width: 80%;
}
.ingridients-input > button {
  display: none;
}
.ingridients-list {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.ingridients-list > li {
  width: 70%;
  list-style-type: none;
  background: #fff;
  padding: 0px 20px;
  margin: 0px 10px;
  color: #000;
  margin-bottom: 3px;
  font-size: 120%;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  display: flex;
  justify-content: space-between;
}
.ingridient-head {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px 0 10px;
}
.ingridient-head > p,
.ingridient-head > h3s {
  margin: 0;
}
.ingridient {
  display: flex;
  gap: 10px;
  align-items: center;
}
.remove-ingridient {
  width: 10px;
  height: 10px;
  display: inline;
  margin-top: 10px;
  font-size: 120%;
}

.remove-ingridient:hover {
  color: red;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.button-done {
  padding: 10px 50px;
  width: fit-content;
  background: -webkit-linear-gradient(#ff00c7d1, #0047ffab);
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 3rem;
  align-self: flex-end;
}
</style>

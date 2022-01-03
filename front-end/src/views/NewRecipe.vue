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

    <form class="new-recipe-p1">
      <input type="text" name="title" placeholder="Title" />

      <textarea
        type="text"
        name="description"
        placeholder="Description"
        id="textarea"
        rows="54"
        cols="50"
      />
      <input type="number" name="durations" placeholder="Durations" />
      <select name="category">
        <option value="category-1">category-1</option>
        <option value="category-2">category-2</option>
        <option value="category-3">category-3</option>
        <option value="category-4">category-4</option>
        <option value="category-5">category-5</option>
      </select>
      <h2>Process</h2>
      <div class="ingridients">
        <div class="ingrid-input">
          <h3>Ingridients</h3>
          <input type="text" v-model="ingridient" />
          <button @click.prevent="addIngridients">Add +</button>
        </div>
        <div class="ingridients-list">
            <!-- Deleting already entered ingridient -->
          <p v-for="ingridient in ingridients" :key="ingridient.id">
            <span
              class="remove-ingridient"
              @click="remove"
              >X</span
            >
            {{ ingridient }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
let index = 0;
export default {
  data() {
    return {
      ingridient: "",
      ingridients: [
        "3 tablespoons olive oil",
        "1 teaspoon dried thyme",
        "2 tablespoons low-sodium soy sauce",
        "2 bunches scallions, thinly sliced",
        "Salt and pepper, to taste",
        "3 cups chicken stock or vegetable stock",
        "4 large handfuls baby spinach leaves",
        "1/2 cup freshly grated Parmesan",
        "1/2 cup chopped fresh parsley",
        "Extra Parmesan (for garnish)",
      ],
    };
  },
  methods: {
    remove(e) {
      console.log(e);
    },
    addIngridients(e) {
      e.preventDefault();
      this.ingridients.push(this.ingridient);
      this.ingridient = "";
      //   index++;
      // console.log(this.ingridient);
    },
  },
};
</script>

<style>
.create-new-header {
  text-align: center;
}
.new-recipe-p1 {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: auto;
  gap: 30px;
}
.new-recipe-p1 > textarea:focus,
.new-recipe-p1 > select:focus,
input:focus {
  outline: none;
}
.new-recipe-p1 > textarea,
.new-recipe-p1 > select,
input {
  height: 50px;
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
#textarea {
  height: 150px;
}
.ingridients {
  display: flex;
}
.ingridients-list {
  display: flex;
  gap: 10px;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  align-items: center;
  flex: 3;
}
.ingridients-list > p {
  background: rgb(230 230 230);
  padding: 5px 10px;
  margin: 5px 5px;
  color: #626262;
  margin-bottom: 3px;
  font-size: 120%;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}
.remove-ingridient {
  width: 10px;
  height: 10px;
  display: inline;
}

.remove-ingridient:hover {
  color: red;
  background: white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
</style>

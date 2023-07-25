const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const cleanRecipeData = require("../controllers/cleanRecipeData");

// Función de búsqueda de recetas por nombre (title)
const searchRecipeName = async (name) => {
  const dbRecipes = await Recipe.findAll({
    where: { title: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Diet,
      attributes: ["name"],
    },
  });

  const dbInfo = dbRecipes.map((elem) => ({
    ...cleanRecipeData(elem),
    createdByDb: true,
  }));

  const infoApiRecipe = await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100&query=${name}`
    )
    .then((response) =>
      response.data.results.map((ele) => ({
        ...cleanRecipeData(ele),
        diets: ele.diets.join(" ,"),
        created: false,
      }))
    );

  const filteredInfo = infoApiRecipe.filter((recipe) =>
    recipe.title.toLowerCase().includes(name.toLowerCase())
  );
  return [...dbInfo, ...filteredInfo];
};

const getAllRecipes = async () => {
  const databaseRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbinfo = databaseRecipes.map((elem) => {
    return {
      id: elem.id,
      title: elem.title,
      image: elem.image,
      summary: elem.summary,
      healthScore: elem.healthScore,
      instructions: elem.analyzedInstructions,
      diets: elem.diets.map((el) => el.name).join(" ,"),
      createdByDb: true,
    };
  });

  const infoApiRecipe = await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100`
    )
    .then((response) =>
      response.data.results.map((ele) => {
        return {
          id: ele.id,
          title: ele.title,
          image: ele.image,
          summary: ele.summary,
          healthScore: ele.healthScore,
          instructions: ele.instructions,
          created: false,
          diets: ele.diets.join(" ,"),
        };
      })
    );

  return [...dbinfo/* , ...infoApiRecipe */];
};

const getRecipeById = async (id, location) => {
  if (location === "api") {
    const apiRecipe = await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
      .then((response) => {
        const ele = response.data;
        return {
          id: ele.id,
          title: ele.title,
          image: ele.image,
          summary: ele.summary,
          healthScore: ele.healthScore,
          instructions: ele.instructions,
          created: false,
          diets: ele.diets.join(" ,"),
        };
      });
    return apiRecipe;
  } else {
    const recipe = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (!recipe) {
      throw new Error(`No recipe with ID ${id} found`);
    }
    return recipe;
  }
};

const createNewRecipe = async (
  title,
  image,
  summary,
  healthScore,
  instructions
) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    instructions,
  });
  return newRecipe;
};

const deleteRecipe = async (id) => {
  const recipe = await Recipe.findByPk(id);
  //const recipeAux = recipe
  //console.log(recipe);
  recipe.destroy();
  //return recipeAux;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  searchRecipeName,
  createNewRecipe,
  deleteRecipe,
};

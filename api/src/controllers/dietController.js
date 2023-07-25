const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;


const alldiets = async () => {

  const alldietsApi = await Diet.findAll();

  if (alldietsApi.length>0) return alldietsApi

  const infoApiDiets = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100`)).data.results;

  const diets = infoApiDiets.map(el => el.diets).flat();

  if (!diets.includes("vegetarian")) {
    diets.push("vegetarian");
  }

  const dietPromises = diets.map(ele => {
    return Diet.findOrCreate({
      where: { name: ele }
    });
  });

console.log(2);
  await Promise.all(dietPromises);

  const alldietsApi2 = await Diet.findAll();

  return alldietsApi2;
};



module.exports = alldiets;
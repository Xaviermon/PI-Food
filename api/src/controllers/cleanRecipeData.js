const cleanRecipeData = (recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    summary: recipe.summary,
    healthScore: recipe.healthScore,
    instructions: recipe.analyzedInstructions,
    diets: recipe.diets.map(el => el.name).join(" ,") || "no se encontraron dietas",
    
  };
};

module.exports = cleanRecipeData;

const { getAllRecipes,
    getRecipeById,
    searchRecipeName,
    createNewRecipe,
    deleteRecipe
} = require("../controllers/recipeController")


const recipeHandler = async (req, res) => {
    const { title } = req.query;
    try {
        const result = title ? await searchRecipeName(title) : await getAllRecipes();
        if (result.length === 0) throw Error("This title don't exist");
        res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

};

const recipeIdHandler = async (req, res) => {
    const { id } = req.params;
    const location = isNaN(id) ? 'db' : 'api';
    try {
        const recipe = await getRecipeById(id, location)
        return res.status(200).json(recipe);

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

};

const postHandler = async (req, res) => {
    const { title, image, summary, healthScore, instructions, diets } = req.body;

    try {
        if (!title || !image || !summary || !healthScore || !instructions) throw new Error('Faltan datos obligatorios')
        const newRecipe = await createNewRecipe(title, image, summary, healthScore, instructions);
        await newRecipe.addDiets(diets)

        res.status(201).json(newRecipe)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }

};

const deleteRecipeHandler = async (req, res) => {
    const { id } = req.params;
      console.log(id);
    try {
      const response = await deleteRecipe(id);
      res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };


module.exports = {
    recipeHandler,
    recipeIdHandler,
    postHandler,
    deleteRecipeHandler
}

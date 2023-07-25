
const {Router} = require('express');
const {
      recipeHandler,
      recipeIdHandler,
      postHandler,
      deleteRecipeHandler
    } = require("../handlers/recipeHandler")

const recipeRouter = Router();

recipeRouter.get("/", recipeHandler);
recipeRouter.get("/:id", recipeIdHandler);
recipeRouter.post("/", postHandler);
recipeRouter.delete('/:id', deleteRecipeHandler);

module.exports= recipeRouter;
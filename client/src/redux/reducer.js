import {
  GET_ALL_RECIPES,
  RECIPE_DETAIL,
  GET_RECIPE_BY_TITLE,
  GET_DIETS,
  FILTER_BY_DIET,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_HEALTH_SCORE,
  CREATE_RECIPE,
  DELETE_RECIPE
} from "./actions-types";

const initialState = {
  allRecipes: [],
  detail: [],
  recipes: [],
  diets: [],
  allrecipesState: [],
  

}

const rootReducer = (state = initialState, action) => {


  switch (action.type) {

    case GET_ALL_RECIPES:
      return {...state, allRecipes: action.payload, recipes: action.payload };

    case RECIPE_DETAIL:
      return {...state, detail: action.payload };

    case GET_RECIPE_BY_TITLE:
      return {...state, allRecipes: action.payload, recipes: action.payload };

    case GET_DIETS:
      return {...state, diets: action.payload};

    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes
      const dietFilter = action.payload === 'all' ? allRecipes : allRecipes.filter(ele => ele.diets?.includes(action.payload))
      return {...state, recipes: dietFilter }

    case FILTER_CREATED:
      const copyRecipes = state.allRecipes
      const createdfilter = action.payload === 'bdd' ? copyRecipes.filter(el => el.createdByDb) : copyRecipes.filter(el => !el.createdByDb)
      return {...state, recipes: action.payload === 'all' ? state.recipes : createdfilter }

    case ORDER_BY_NAME:
      const sortedRecipes = [...state.allRecipes];
      const sortArr = action.payload === "asc"
        ? sortedRecipes.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        })
        : sortedRecipes.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          return 0;
        });
      return {...state, recipes: sortArr};

    case ORDER_BY_HEALTH_SCORE:
      const copyState = [...state.allRecipes]
      const orderHS = action.payload === 'des' ? copyState.sort((a, b) => b.healthScore - a.healthScore)
        : copyState.sort((a, b) => a.healthScore - b.healthScore)
      return {...state, recipes: orderHS};

    case CREATE_RECIPE:
      return { ...state };

    case DELETE_RECIPE:
      return { ...state, recipes: action.payload};

      
    default:
      return { ...state };
  }
};

export default rootReducer
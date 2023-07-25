import { Get_All } from "../Functions/Recipe";
import axios from "axios";

import {
    GET_ALL_RECIPES,
    RECIPE_DETAIL,
    GET_RECIPE_BY_TITLE,
    GET_DIETS,
    FILTER_BY_DIET,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_HEALTH_SCORE,
    DELETE_RECIPE

} from "./actions-types";

const apiUrl = "http://localhost:3001";

export const getAllRecipes = () => {
    return async function (dispatch) {
        const json = await Get_All();  //hacemos el pedido a la ruta ppal 
        const data = json.data;

        const action = {
            type: GET_ALL_RECIPES,
            payload: data
        }

        return dispatch(action)
    }
};


export const recipeDetail = (id) => {
    return async function (dispatch) {
        try {

            const json = await axios.get(`${apiUrl}/recipes/${id}`);
            const data = json.data;
            return dispatch({ type: RECIPE_DETAIL, payload: data })
        } catch (error) {
            return alert(error.message)
        }
    }
};


export const getRecipeByTitle = (title) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${apiUrl}/recipes?title=${title}`);
            const data = json.data;
            return dispatch({
                type: GET_RECIPE_BY_TITLE,
                payload: data
            })
        } catch (error) {
            return alert(error.response.data)
        }
    }
};


export const getDiets = () => {
    return async function (dispatch) {
        const json = await axios.get(`${apiUrl}/diets`)
        const data = json.data;
        return dispatch({
            type: GET_DIETS,
            payload: data
        })

    }
};

export const filterByDiet = (payload) => {

    return {
        type: FILTER_BY_DIET,
        payload
    }
};

export const filterCreated = (payload) => {

    return {
        type: FILTER_CREATED,
        payload
    }
};

export const orderByName = (payload) => {

    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export const orderByHealthScore = (payload) => {
    return {
        type: ORDER_BY_HEALTH_SCORE,
        payload
    }
};

export const createRecipe = (payload) => {
    return async function (dispatch) {

        const data = await axios.post(`${apiUrl}/recipes`, payload)
        return data;
    }
};

export const deleteRecipe = (id) => {
    return async function (dispatch) {

            try {
                const response = (await axios.delete(`${apiUrl}/recipes/${id}`)); 
                return dispatch({ type: DELETE_RECIPE, payload: response }) ? console.log("recipe deleted"): response;
            } catch (error) {
                return alert(error.response.data.error)
            }
        };
    };



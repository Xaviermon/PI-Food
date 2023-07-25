import axios from "axios";



export const Get_All = async () => {

    const url= "http://localhost:3001/recipes"
    const recipes = await axios.get(url);

    return recipes;
}

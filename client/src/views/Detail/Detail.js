import style from "../Detail/Detail.module.css";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, getAllRecipes, recipeDetail } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
//import { Get_All } from "../../Functions/Recipe";


const Detail = () => {
    const params = useParams();        //obtengo parametros de la URL (id)
    const dispatch = useDispatch();     // dispara la accion de recipeDetail
    const navigate = useNavigate();
    const recipe = useSelector((state) => state.detail)  //accedo al edo de redux y obtengo el detalle de la receta por id


    useEffect(() => {                         //dispara la accion recipeDetail con el id de la receta para obtener
        dispatch(recipeDetail(params.id))   //los detalles y almacenarlo en el edo de redux
    }, [dispatch, params.id ]);

    const handleDelete = (id) => {
        dispatch(deleteRecipe(id));
        alert("receta eliminada")
        dispatch(getAllRecipes())
        setTimeout(()=>{navigate("/home")},1500)
        
    };

        return (
            <>
                <NavBar />
                <div className={style.content}>
                    <div>
                        <hr />
                        {   //si existe la receta, muestro el detalle
                            recipe
                                ?
                                <div className={style.contenedor}>
                                    <h1 className={style.title}>{recipe.title}</h1>
                                    <Link to="/home">
                                        <button className={style.button}>Back</button>
                                    </Link>

                                    <button className={style.button} onClick={()=>handleDelete(params.id)}>Delete</button>

                                    <img src={recipe.image} alt="img" className={style.img} />
                                    <hr />
                                    <h2 className={style.text}>Summary: {recipe.summary?.replace(/<[^>]*>/g, "")}</h2>
                                    <hr />
                                    <h2 className={style.text}>Health Score: {recipe.healthScore}</h2>
                                    <hr />
                                    <h2 className={style.text}>Instructions: {recipe.instructions?.replace(/<[^>]*>/g, "")}</h2>
                                    <hr />
                                    <h3 className={style.text}>Diets: {recipe.diets && Array.isArray(recipe.diets) ?
                                        recipe.diets.map(el => el.name).join(" ,") :
                                        recipe.diets || "no se encontraron dietas"
                                    }
                                    </h3>
                                </div>
                                :
                                <p>Loading...</p>
                        }
                        <hr />

                    </div>

                </div>
            </>
        )

    };


export default Detail;
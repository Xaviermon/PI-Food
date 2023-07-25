import React, { useEffect, useState } from 'react';
import ContainerComponent from '../../components/Container/Container.Component';
import { getAllRecipes, getDiets } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../../components/NavBar/NavBar';
import SearchComponent from "../../components/Search/Search.Component"
import style from "./Home.module.css"
import FilterComponent from '../../components/Filters/Filter.Component';
import Paginado from '../../components/Paginado/Paginado';


const Home = () => {

    const dispatch = useDispatch();   //REDUX
    const allRecipes = useSelector((state) => state.allRecipes);
    const recipes = useSelector((state)=> state.recipes);
    const [var1, setVar1] = useState(false)
    const [order, setOrder] = useState("");

    // eslint-disable-next-line
    const [saveState, setSaveState] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    useEffect(() => {
        if (allRecipes.length === 0) {
            dispatch(getAllRecipes()) //dispatch(getDiets())
        }
    }, [dispatch,allRecipes]);

    // eslint-disable-next-line
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const mostrarNavBar = (mostrar) => {
        setVar1(mostrar)
    }
    return (

        <div className={style.container}>
            <div>
                {
                    var1 === true ? <NavBar /> : null
                }
                <button onClick={() => mostrarNavBar(true)}>
                    Mostrar Barra de Navegación
                </button>

                <button onClick={() => mostrarNavBar(false)}>
                    Ocultar Barra de Navegación
                </button>
                <button onClick={() => dispatch(getAllRecipes())}>
                    Reload Recipes
                </button>/
            </div>

            <div className={style.name}>
                <h1>Welcome to Food App</h1>
                <SearchComponent setCurrentPage={setCurrentPage} />
                <div>
                    <FilterComponent setCurrentPage={setCurrentPage} setSaveState={setSaveState} />
                </div>

            </div>

            <div className={style.cointainerViews}>
                <div className={style.containerPaginado}>
                    <Paginado
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginado={paginado}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <div>
            {
                currentRecipes.length !==0? <ContainerComponent allRecipes={allRecipes} currentRecipes={currentRecipes} />  : <div/>
            }
            </div>

            
        </div>
    )
};



export default Home;
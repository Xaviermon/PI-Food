import style from "../NavBar/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { getAllRecipes } from '../../redux/actions';
import { useDispatch } from "react-redux";

const NavBar = () => {
    const dispatch = useDispatch();
    return (
        <>
            <nav className={style.mainContainer}>
                <div>

                    <NavLink to="/">
                        <button className={style.button}>Foods</button>
                    </NavLink>

                    <NavLink to="/home">
                        <button className={style.button}>
                            Home
                        </button>
                    </NavLink>

                    <NavLink to="/create">
                        <button className={style.button}>Create recipe</button>
                    </NavLink>

                    <button className= {style.button} onClick={() => dispatch(getAllRecipes())}>
                        Reload Recipes
                    </button>

                </div>

            </nav>
        </>
    )

}


export default NavBar;
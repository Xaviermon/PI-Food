import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { getRecipeByTitle } from "../../redux/actions";
import style from "./Search.Component.module.css"



const SearchComponent = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipeByTitle(title));
        setTitle("");
    }

    return (
        <>
            <div>
                
            <label for="opcion">Find your recipe:</label><input type="text" placeholder="Search..." value={title} onChange={(e) => handleInputChange(e)} className={style.inp} />
                <button type="button" onClick={(e) => handleSubmit(e)} className={style.button}>Search</button>
            </div>
        </>

    );
}

export default SearchComponent;
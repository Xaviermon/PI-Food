import React, { useEffect, useState } from 'react';
import style from "./Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets, getAllRecipes } from '../../redux/actions';

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector((state) => state.diets);

useEffect(()=>{
    dispatch(getDiets())
},[])

    const initialFormValues = {
        title: "",
        summary: "",
        healthScore: "",
        instructions: "",
        diets: [],
        image: "",
    };

    const [form, setForm] = useState(initialFormValues);
    const [checked, setChecked] = useState({});
    const [errors, setErrors] = useState(initialFormValues);


    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({ ...form, [property]: value })
        setForm({ ...form, [property]: value })
    };

    const handleSelect = (event) => {
        const dietId = event.target.value;
        const isChecked = event.target.checked;

        setChecked({
            ...checked, [dietId]: isChecked,
        });

        setForm({
            ...form,
            diets: isChecked ? [...form.diets, dietId] : form.diets.filter((id) => id !== dietId),
        });
    };

    function isValidHealthScore(value) {
        const parsedValue = Number(value);
        return !isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue > 0 && parsedValue < 100;
    }


    const validate = (form) => {

        let newErrors = {};

        newErrors.title = !form.title ? "Complete the title" : "";  // si title esta vacio o incompleto se envia msge de error
        newErrors.summary = !form.summary ? "Complete the summary" : "";
        newErrors.instructions = !form.instructions ? "Complete the instructions" : "";

        if (!isValidHealthScore(form.healthScore)) {
            newErrors.healthScore = "Health Score must be a number between 1 and 100";
        }

        if (!form.diets || form.diets.length === 0) {
            newErrors.diets = "Select at least one diet";
        } else {
            newErrors.diets = "";
        }

        function isValidImageUrl(url) {
            const imageRegex = /\.(jpeg|jpg|gif|png|webp)$/i;
            return typeof url === "string" && url.match(imageRegex);
        }
        newErrors.image = isValidImageUrl(form.image) ? "" : "Enter a valid image URL"; setErrors(newErrors)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        validate(form);
        if (Object.values(errors).some((error) => error !== "")) {
            return alert("Faltan datos");
        }
        dispatch(createRecipe(form));
        dispatch(getAllRecipes())
        alert("Successful registration!");
        navigate("/home");
    };

    return (
        <>
            <div className={style.contenedor}>

                <div className={style.formContainer}>
                    <h1 className={style.formTitle}>Create your recipe</h1>
                    <br></br>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className={style.title}>Title: </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className={style.inp}
                            />
                            {errors.title && <span className={style.error} >{errors.title}</span>}
                        </div>



                        <div>
                            <label htmlFor="summary" className={style.title}>Summary: </label>
                            <textarea
                                name="summary"
                                onChange={handleChange}
                                value={form.summary}
                                className={style.inp}
                            />
                            {errors.summary && <span className={style.error} >{errors.summary}</span>}
                        </div>




                        <div>
                            <label htmlFor="healthScore" className={style.title}>Health score (1-100)% :</label>
                            <input
                                type="text"
                                name="healthScore"
                                value={form.healthScore}
                                onChange={handleChange}
                                className={style.inphs}
                            />{errors.healthScore && <span className={style.error} >{errors.healthScore}</span>}
                        </div>



                        <div>
                            <label htmlFor="instructions" className={style.title}> Instructions:</label>
                            <textarea
                                name="instructions"
                                onChange={handleChange}
                                value={form.instructions}
                                className={style.inp}
                            />
                            {errors.instructions && <span className={style.error} >{errors.instructions}</span>}
                        </div>



                        <hr />

                        <label className={style.title}>Choose one diet or more </label>


                        <hr />
                        {diets.length ? (
                            diets.map((element) => {
                                return (
                                    <label className={style.cont} key={element.id}>
                                        <input
                                            type="checkbox"
                                            value={element.id}
                                            name={element.name}
                                            onChange={handleSelect}
                                            className={style.check}
                                        />
                                        {element.name}
                                    </label>

                                );
                            })
                        ) : (
                            <div>Waiting...</div>

                        )} {errors.diets && <span className={style.error} >{errors.diets}</span>}



                        <hr />
                        <div >
                            <label htmlFor="image" className={style.title}> Image: </label>
                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className={style.inp}
                            />
                        </div>
                        {errors.image && <span className={style.error} >{errors.image}</span>}
                        <hr />
                        <button type="submit" className={style.button}> Submit </button>  
                        <div className={style.btnhome}>
                            <Link to="/home">
                                <button className={style.button}>Return Home</button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;

import React from 'react';
import CardComponent from '../Card/Card.Component';
import style from "./Container.Component.module.css"
import { useSelector } from "react-redux"

const ContainerComponent = ({ currentRecipes, allRecipes }) => {
    //const {currentRecipes,allRecipes}=props
    const recipes = useSelector(state => state.allRecipes)
    return (

        <div className={style.container}>
           
            {
                currentRecipes?.map((e) => {
                    return (
                        <CardComponent
                            key={e.id}
                            image={e.image}
                            title={e.title}
                            diets={e.diets}
                            id={e.id}
                            healthScore={e.healthScore}
                        />)
                })

            }
        </div>
    );
}

export default ContainerComponent;



  
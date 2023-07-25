import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css"


const Landing = ()=>{
    return (

<>
<div className={style.container}>
        <div className={style.des}>
        <h1 className={style.title}>Welcome to Ceci's Food Delight</h1>
        </div>
        <div className={style.cont}>
        <div className={style.des}>
         This is a page made with a lot of love by 
        Cecilia Castellano, so you can find your ideal recipe 
        and create a recipe in your style that you want to share!! 
        Enjoy it!
        </div>
        </div>
    <Link to="/home">
    <button className={style.button}>START</button>
    </Link>
    

</div>
</>
    )


}

export default Landing;
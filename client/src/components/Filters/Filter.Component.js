import React from 'react';
import { useDispatch } from "react-redux";
import style from "./Filter.Component.module.css"
import { filterByDiet, filterCreated, orderByName, orderByHealthScore } from '../../redux/actions';



const FilterComponent = () => {

  const dispatch = useDispatch();
  const handleFilterDiet = (event) => {
    dispatch(filterByDiet(event.target.value))
    //setCurrentPage(1)
  }

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value))
    //setCurrentPage(1)
  }

  const handleOrderByName = (e) => {
    dispatch(orderByName(e.target.value))
    //setCurrentPage(1)
  }

  const handleOrderByHs = (e) => {
    dispatch(orderByHealthScore(e.target.value))
    //setCurrentPage(1)
  }

  return (

    <div className={style.containerSelect}>


      <div className={style.item}>
        <div className={style.title}>
          Orders by Name:
        </div>
        <div className={style.contenedorSelect}>
          <div className={style.containerSelect}>
            <select onChange={handleOrderByName} className={style.selectWrapper} >
              <option value=""> Select an option...</option>
              <option value="asc">Ascending A-Z</option>
              <option value="des">Descending Z-A</option>
            </select>
          </div>
          <div>

          </div>

          <br></br>
        </div>
        <span>
          Order By HealthScore
          <br></br>
        </span>

        <div className={style.order}>
          <div className={style.containerSelect}>
            <select onChange={handleOrderByHs} className={style.selectWrapper}>
              <option value="">Order by HealthScore</option>
              <option value="asc">From minor to major</option>
              <option value="des">From major to minor</option>
            </select>
          </div>
        </div>
      </div>

      <span>
        Filters
        <br></br>
      </span>
      <select onChange={handleFilterDiet} className={style.selectWrapper}>
        <option value="">Select Diet...</option>
        <option value="all">All</option>
        <option value="gluten free">Gluten free</option>
        <option value="dairy free">Dairy free</option>
        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="paleolithic">Paleolithic</option>
        <option value="primal">Primal</option>
        <option value="whole 30">Whole 30</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="fodmap friendly">Fodmap friendly</option>
      </select>

      <select onChange={handleFilterCreated} className={style.selectWrapper}>
        <option value="">Select Origin...</option>
        <option value="all">All</option>
        <option value="api">Recipes Api</option>
        <option value="bdd">Recipes DataBase</option>
      </select>

    </div >

  )

}

export default FilterComponent
